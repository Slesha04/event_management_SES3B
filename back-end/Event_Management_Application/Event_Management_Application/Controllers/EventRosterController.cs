using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [Route("AddAttendee/{rosterId}/{eventId}/{attendeeId}")]
        [HttpPost]
        [Authorize]
        public ActionResult AddAttendee([FromRoute] int rosterId, [FromRoute] int eventId, [FromRoute] int attendeeId)
        {
            if (IsUserRegisteredForEvent(eventId, attendeeId))
            {
                return BadRequest("This user is already registered for this event.");
			}

            if (!_dbContext.Events.Where(x => x.EventId == eventId).Any())
            {
                return BadRequest("This event does not exist.");
			}

            var newEntry = new EventRosterEntry(eventId, attendeeId);
            _dbContext.EventRosterEntries.Add(newEntry);
            _dbContext.SaveChanges();

            return Ok(newEntry);
        }

        [Route("RemoveAttendee/{rosterId}/{eventId}/{attendeeId}")]
        [HttpDelete]
        [Authorize]
        public ActionResult RemoveAttendee([FromRoute] int rosterId, [FromRoute] int eventId, [FromRoute] int attendeeId)
        {
            if (!IsUserRegisteredForEvent(eventId, attendeeId))
            {
                return BadRequest("This user has not been registered for this event.");
            }

            if (!_dbContext.Events.Where(x => x.EventId == eventId).Any())
            {
                return BadRequest("This event does not exist.");
            }

            var entryToRemove = _dbContext.EventRosterEntries.Where(x => x.EventId == eventId && x.AttendeeId == attendeeId).FirstOrDefault();
            _dbContext.EventRosterEntries.Remove(entryToRemove);
            _dbContext.SaveChanges();

            return Ok();
        }

        bool IsUserRegisteredForEvent(int eventId, int userId)
        {
            return _dbContext.EventRosterEntries.Where(x => x.AttendeeId == userId && x.EventId == eventId).Any();
        }

        [Route("GetRosterByEvent/{eventId}")]
        [HttpGet]
        [Authorize]
        public ActionResult GetRosterByEvent([FromRoute] int eventId)
        {
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(_tokenManager.ExtractToken(Request));
            var currEvent = _dbContext.Events.Where(x => x.EventId == eventId).FirstOrDefault();
            if(tokenEntry != null)
            {
                if(currEvent != null)
                {
                    if(tokenEntry.UserId == currEvent.EventOrganiserId)
                    {
                        return Ok(_rosterManager.GetEntriesByEvent(eventId));
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
                if(tokenEntry.UserId == currEvent.EventOrganiserId)
                {
                    if(currEvent != null)
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
                var entry = _dbContext.EventRosterEntries.Where(x => x.EventId == eventId && x.InputCode == inputCode).FirstOrDefault();

                if (entry == null)
                {
                    return BadRequest("No event roster entry corresponding to event Id");
                }

                entry.AttendeeArrived = true;

                _dbContext.SaveChanges();

                return Ok();
            }
            return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
        }
    }
}
