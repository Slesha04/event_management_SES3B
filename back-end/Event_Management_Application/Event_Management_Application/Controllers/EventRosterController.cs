using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Event_Management_Application.Controllers.ResponseModels;
using Event_Management_Application.DataAccess;
using Event_Management_Application.Models;
using Event_Management_Application.ResourceManagement;
using Event_Management_Application.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Event_Management_Application.Controllers
{
    [Route("api/EventRosterController")]
    [ApiController]
    public class EventRosterController : ControllerBase
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        private readonly TokenManager _tokenManager;
        private readonly EventRosterManager _rosterManager;

        public EventRosterController(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _tokenManager = new TokenManager(_dbContext);
            _rosterManager = new EventRosterManager(_dbContext);
        }

        [Route("AddAttendee/{eventId}")]
        [HttpPost]
        [Authorize]
        public ActionResult AddAttendee([FromRoute] int eventId)
        {
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(_tokenManager.ExtractToken(Request));
            var attendeeId = tokenEntry.UserId;
            var currUser = _dbContext.Users.Where(x => x.UserId == attendeeId).FirstOrDefault();
            var currEvent = _dbContext.Events.Where(x => x.EventId == eventId).FirstOrDefault();

            if (tokenEntry == null)
            {
                return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
            }

            if (currUser == null)
            {
                return BadRequest("User does not exist");
            }

            if (IsUserRegisteredForEvent(eventId, attendeeId))
            {
                return BadRequest("This user is already registered for this event.");
            }

            if (!_dbContext.Events.Where(x => x.EventId == eventId).Any())
            {
                return BadRequest("This event does not exist.");
            }

            var newEntry = new EventRosterEntry
            {
                EventId = eventId,
                AttendeeId = attendeeId,
                DateRegistered = DateTime.Now,
                AttendeeArrived = false,
                InputCode = _rosterManager.GenerateInputCode(attendeeId),
                AttendeeUsername = currUser.UserName
            };
            _dbContext.EventRosterEntries.Add(newEntry);
            _dbContext.SaveChanges();

            return Ok(newEntry);
        }

        [Route("RemoveAttendee/{eventId}/{attendeeId}")]
        [HttpDelete]
        [Authorize]
        public ActionResult RemoveAttendee([FromRoute] int eventId, [FromRoute] int attendeeId)
        {
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(_tokenManager.ExtractToken(Request));
            var currEvent = _dbContext.Events.Where(x => x.EventId == eventId).FirstOrDefault();

            if (tokenEntry == null)
            {
                return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
            }

            if (currEvent == null)
            {
                return BadRequest("This event does not exist.");
            }

            if (tokenEntry.UserId != attendeeId && tokenEntry.UserId != currEvent.EventOrganiserId)
            {
                return StatusCode(401, SystemResources.INCORRECT_USER_TOKEN_MESSAGE);
            }

            if (!IsUserRegisteredForEvent(eventId, attendeeId))
            {
                return BadRequest("This user has not been registered for this event.");
            }

            var entryToRemove = _dbContext.EventRosterEntries.Where(x => x.EventId == eventId && x.AttendeeId == attendeeId).FirstOrDefault();
            _dbContext.EventRosterEntries.Remove(entryToRemove);
            _dbContext.SaveChanges();

            return Ok();
        }

        private bool IsUserRegisteredForEvent(int eventId, int userId)
        {
            return _dbContext.EventRosterEntries.Where(x => x.AttendeeId == userId && x.EventId == eventId).Any();
        }

        [Route("GetRosterByEvent/{eventId}")]
        [HttpGet]
        public ActionResult GetRosterByEvent([FromRoute] int eventId)
        {
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(_tokenManager.ExtractToken(Request));
            var currEvent = _dbContext.Events.Where(x => x.EventId == eventId).FirstOrDefault();
            if (tokenEntry != null)
            {
                if (currEvent != null)
                {
                    if (tokenEntry.UserId == currEvent.EventOrganiserId)
                    {
                        return Ok(_rosterManager.GetEntriesByEvent(eventId).OrderBy(x => x.AttendeeUsername));
                    }
                    return StatusCode(401, SystemResources.INCORRECT_USER_TOKEN_MESSAGE);
                }
                else
                {
                    return BadRequest("Event Id does not pertain to an event");
                }
            }
            return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
        }

        [Route("UpdateRoster")]
        [HttpPut]
        [Authorize]
        public ActionResult UpdateRoster([FromBody] ICollection<EventRosterEntry> roster)
        {
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(_tokenManager.ExtractToken(Request));
            var currEvent = _dbContext.Events.Where(x => x.EventId == roster.ElementAt(0).EventId).FirstOrDefault();
            if (tokenEntry != null)
            {
                if (tokenEntry.UserId == currEvent.EventOrganiserId)
                {
                    if (currEvent != null)
                    {
                        _rosterManager.UpdateEntries(roster);
                        return Ok();
                    }
                    return BadRequest("Event Id does not pertain to an event");
                }
                return StatusCode(401, SystemResources.INCORRECT_USER_TOKEN_MESSAGE);
            }
            return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
        }

        [Route("MarkAttendeeSelf/{inputCode}/{eventId}")]
        [HttpPut]
        [Authorize]
        public ActionResult MarkAttendeeSelf([FromRoute] string inputCode, [FromRoute] int eventId)
        {
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(_tokenManager.ExtractToken(Request));
            if (tokenEntry != null)
            {
                //var entry = _dbContext.EventRosterEntries.Where(x => tokenEntry.User.UserId == x.AttendeeId && x.EventId == eventId && x.InputCode == inputCode).FirstOrDefault();
                var entry = _dbContext.EventRosterEntries.Where(x => x.EventId == eventId && x.AttendeeId == tokenEntry.UserId).FirstOrDefault();

                if (entry == null)
                {
                    return BadRequest("No event roster entry corresponding to event Id");
                }

                if (!inputCode.Equals(entry.InputCode))
                {
                    return BadRequest(SystemResources.INCORRECT_INPUT_CODE);
                }

                entry.AttendeeArrived = true;

                _dbContext.SaveChanges();

                return Ok();
            }
            return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
        }

        [Route("GetRosterEntriesByUser")]
        [HttpGet]
        [Authorize]
        public List<RosterEntryResponse> GetRosterEntriesByUser()
        {
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(_tokenManager.ExtractToken(Request));
            if (tokenEntry != null)
            {
                var response = new List<RosterEntryResponse>();
                var rosterEntries = _dbContext.EventRosterEntries.Where(x => x.AttendeeId == tokenEntry.UserId).OrderByDescending(x => x.DateRegistered).ToList();
                foreach(var entry in rosterEntries)
                {
                    var currEvent = _dbContext.Events.Where(x => x.EventId == entry.EventId).FirstOrDefault();
                    var eventOrganiser = _dbContext.Users.Where(x => x.UserId == currEvent.EventOrganiserId).FirstOrDefault();
                    RosterEntryResponse entryResponse = new RosterEntryResponse
                    {
                        RosterEntry = entry,
                        EventOrganiserUsername = eventOrganiser.UserName,
                        EventTitle = currEvent.EventTitle
                    };
                    response.Add(entryResponse);
                }
                return response;
            }
            return null;
        }
    }
}
