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

        [Route("AddAttendee/{rosterId}")]
        [HttpPost]
        [Authorize]
        public ActionResult AddAttendee([FromRoute] int rosterId)
        {
            throw new NotImplementedException();
        }

        [Route("RemoveAttendee/{rosterId}")]
        [HttpDelete]
        [Authorize]
        public ActionResult RemoveAttendee([FromRoute] int rosterId)
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }
    }
}