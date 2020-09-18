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

namespace Event_Management_Application.Controllers
{
    [Route("api/EventRosterController")]
    [ApiController]
    public class EventRosterController : ControllerBase
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        private readonly TokenManager _tokenManager;

        public EventRosterController(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _tokenManager = new TokenManager(_dbContext);
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
        public List<EventRosterEntry> GetRosterByEvent([FromRoute] int eventId)
        {
            throw new NotImplementedException();
        }

        [Route("UpdateRoster")]
        [HttpPut]
        [Authorize]
        public ActionResult UpdateRoster([FromBody] ICollection<EventRosterEntry> roster)
        {
            throw new NotImplementedException();
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
