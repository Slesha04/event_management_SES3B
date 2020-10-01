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
    [Route("api/EventChatController")]
    [ApiController]
    public class EventChatController : ControllerBase
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        private readonly TokenManager _tokenManager;
        private readonly FileManager _fileManager;

        public EventChatController(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _tokenManager = new TokenManager(_dbContext);
            _fileManager = new FileManager(_dbContext);
        }

        [Route("PostMessage/{messageText}/{channelId}")]
        [HttpPost]
        [Authorize]
        public ActionResult PostMessage([FromRoute] string messageText, [FromRoute] int channelId)
        {
            throw new NotImplementedException();
        }

        [Route("RemoveMessage/{messageId}")]
        [HttpDelete]
        [Authorize]
        public ActionResult RemoveMessage([FromRoute] int messageId)
        {
            throw new NotImplementedException();
        }

        [Route("AddFiles/{channelId}")]
        [HttpPut]
        [Authorize]
        public ActionResult AddFiles([FromBody] ICollection<Medium> files, int channelId)
        {
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(_tokenManager.ExtractToken(Request));
            if(tokenEntry != null)
            {
                var currEvent = _dbContext.Events.Where(x => x.ChannelId == channelId).FirstOrDefault();
                if (currEvent != null)
                {
                    var rosterEntry = _dbContext.EventRosterEntries.Where(x => x.EventId == currEvent.EventId && x.AttendeeId == tokenEntry.UserId).FirstOrDefault();
                    if (rosterEntry != null && tokenEntry.UserId != currEvent.EventOrganiserId)
                    {
                        _fileManager.AddFilesToChannel(files, channelId, currEvent.EventId, tokenEntry.UserId);
                        return Ok();
                    }
                    return BadRequest("User is not registered for event");
                }
                return BadRequest("Event is not valid");
            }
            return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
        }

        [Route("RemoveFiles/{channelId}")]
        [HttpDelete]
        [Authorize]
        public ActionResult RemoveFiles([FromBody] ICollection<int> fileIds, [FromRoute] int channelId)
        {
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(_tokenManager.ExtractToken(Request));
            if (tokenEntry != null)
            {
                var filesToRemove = _dbContext.Media.Where(x => fileIds.Contains(x.FileId)).ToList();
                var currEvent = GetEventByChannel(channelId);
                var authorizedFilesToRemove = filesToRemove.FindAll(x => x.UploaderId == tokenEntry.UserId);
                if(filesToRemove.Count != authorizedFilesToRemove.Count && currEvent.EventOrganiserId != tokenEntry.UserId)
                {
                    return StatusCode(401, SystemResources.INCORRECT_USER_TOKEN_MESSAGE);
                }
                _fileManager.RemoveFilesFromChannel(fileIds);
                return Ok();
            }
            return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
        }
        
        [Route("GetChannelByEvent/{eventId}")]
        [HttpGet]
        public Channel GetChannelByEvent([FromRoute] int eventId)
        {
            var channel = _dbContext.Events.Where(x => eventId == x.EventId).FirstOrDefault();
            if(channel != null)
            {
                return _dbContext.Channels.Where(x => x.ChannelId == channel.ChannelId).FirstOrDefault();
            }
            return null;
        }

        [Route("LoadChannelMessages/{messageSequenceNumber}/{channelId}")]
        [HttpGet]
        public List<Message> LoadChannelMessages([FromRoute] int messageSequenceNumber, [FromRoute] int channelId, [FromQuery] int messageLoadLimit = 30)
        {
            return _dbContext.Messages.Where(x => x.ChannelId == channelId && x.SequenceNumber >= messageSequenceNumber).Take(messageLoadLimit).ToList();
        }

        [Route("LoadChannelFiles/{channelId}")]
        [HttpGet]
        public List<Medium> LoadChannelFiles([FromRoute] int channelId)
        {
            throw new NotImplementedException();
        }

        [Route("GetGlobalChannel")]
        [HttpGet]
        public Channel GetGlobalChannel()
        {
            return _dbContext.Channels.Where(x => x.IsGlobal).FirstOrDefault();
        }

        [Route("GetEventByChannel/{channelId}")]
        [HttpGet]
        public Event GetEventByChannel(int channelId)
        {
            return _dbContext.Events.Where(x => x.ChannelId == channelId).FirstOrDefault();
        }
    }
}