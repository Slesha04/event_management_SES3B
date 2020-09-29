using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Event_Management_Application.DataAccess;
using Event_Management_Application.Models;
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

        public EventChatController(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _tokenManager = new TokenManager(_dbContext);
        }

        [Route("PostMessage/{messageText}")]
        [HttpPost]
        [Authorize]
        public ActionResult PostMessage([FromRoute] string messageText)
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

        [Route("AddFiles")]
        [HttpPut]
        [Authorize]
        public ActionResult AddFiles([FromBody] ICollection<Medium> files)
        {
            throw new NotImplementedException();
        }

        [Route("RemoveFiles")]
        [HttpDelete]
        [Authorize]
        public ActionResult RemoveFiles([FromBody] ICollection<int> fileIds)
        {
            throw new NotImplementedException();
        }
        
        [Route("GetChannelByEvent/{eventId}")]
        [HttpGet]
        public Channel GetChannelByEvent([FromRoute] int eventId)
        {
            throw new NotImplementedException();
        }

        [Route("LoadChannelMessages/{messageSequenceNumber}/{channelId}")]
        [HttpGet]
        public List<Message> LoadChannelMessages([FromRoute] int messageSequenceNumber, [FromRoute] int channelId, [FromQuery] int messageLoadLimit = 30)
        {
            throw new NotImplementedException();
        }

        [Route("LoadChannelFiles/{channelId}")]
        [HttpGet]
        public List<Medium> LoadChannelFiles([FromRoute] int channelId)
        {
            throw new NotImplementedException();
        } 
    }
}