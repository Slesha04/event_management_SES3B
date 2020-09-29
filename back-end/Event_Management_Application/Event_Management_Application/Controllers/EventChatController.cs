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
        [Authorize]
        public ActionResult PostMessage(string messageText)
        {
            throw new NotImplementedException();
        }

        [Route("AddFile/{fileContent}/{fileName}/{fileSize}/{channelId}")]
        [Authorize]
        public ActionResult AddFile(byte[] fileContent, string fileName, float fileSize, int channelId)
        {
            throw new NotImplementedException();
        }
        
        [Route("GetChannelByEvent/{eventId}")]
        public Channel GetChannelByEvent(int eventId)
        {
            throw new NotImplementedException();
        }

        [Route("LoadChannelMessages/{messageSequenceNumber}/{channelId}")]
        public List<Message> LoadChannelMessages(int messageSequenceNumber, int channelId, int messageLoadLimit = 30)
        {
            throw new NotImplementedException();
        }

        [Route("LoadChannelFiles/{channelId}")]
        public List<Medium> LoadChannelFiles(int channelId)
        {
            throw new NotImplementedException();
        } 
    }
}