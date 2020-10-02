using Event_Management_Application.Controllers.Interfaces;
using Event_Management_Application.Controllers.RequestModels;
using Event_Management_Application.DataAccess;
using Event_Management_Application.Enums;
using Event_Management_Application.Models;
using Event_Management_Application.ResourceManagement;
using Event_Management_Application.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.Controllers
{
    [Route("api/EventController")]
    [ApiController]
    public class EventController : ControllerBase, IEventController
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        private readonly TokenManager _tokenManager;
        private readonly EventTagManager _tagManager;
        private readonly EventChannelManager _channelManager;
        private readonly FileManager _fileManager;

        public EventController(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _tokenManager = new TokenManager(_dbContext);
            _tagManager = new EventTagManager(_dbContext);
            _channelManager = new EventChannelManager(_dbContext);
            _fileManager = new FileManager(_dbContext);
        }

        [Route("CreateEvent/{eventTitle}/{eventBodyText}/{eventLocation}/{eventDate}/{ticketPrice}/{eventType}/{eventVisibility}")]
        [HttpPut]
        [Authorize]
        public ActionResult CreateEvent([FromRoute] string eventTitle, [FromRoute] string eventBodyText, [FromRoute] string eventLocation, [FromRoute] string eventDate, [FromRoute] float ticketPrice, [FromRoute] int eventType, [FromRoute] int eventVisibility, [FromQuery] string tags = null, [FromQuery] int? eventCoverImageId = null, [FromQuery] int? eventTrailerVideoId = null)
        {
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(_tokenManager.ExtractToken(Request));
            if (tokenEntry != null)
            {
                var currentDate = DateTime.Now;
                var userId = tokenEntry.User.UserId;
                var channelCode = Guid.NewGuid();
                var newEvent = new Event
                {
                    EventTitle = eventTitle,
                    BodyText = eventBodyText,
                    Location = new FormalAddress(eventLocation),
                    EventDate = DateTime.Parse(eventDate),
                    EventCoverImageFileId = eventCoverImageId,
                    EventVideoTrailerFileId = eventTrailerVideoId,
                    EventOrganiserId = userId,
                    EventOrganiser = tokenEntry.User,
                    EventCreationDate = currentDate,
                    EventLastModifiedDate = currentDate,
                    EventType = (EventType)eventType,
                    EventVisibility = (VisibilityLevel)eventVisibility,
                    ViewCount = 0,
                    EventTicketPrice = ticketPrice,
                    EventStatus = EventStatus.Active,
                    ChannelCode = channelCode
                };
                _channelManager.AssignChannelToEvent(ref newEvent);
                _dbContext.Events.Add(newEvent);
                _dbContext.SaveChanges();
                var createdEvent = _dbContext.Events.Where(x => x.ChannelCode.Equals(channelCode)).OrderByDescending(x => x.EventCreationDate).FirstOrDefault();
                _tagManager.AssignTagsToEvent(tags, createdEvent.EventId);
                return Ok(createdEvent);
            }
            return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
        }

        [Route("DeleteEvent/{eventId}")]
        [HttpDelete]
        [Authorize]
        public ActionResult DeleteEvent([FromRoute] int eventId)
        {
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(_tokenManager.ExtractToken(Request));
            if (tokenEntry != null)
            {
                var currentEvent = _dbContext.Events.Where(x => x.EventId == eventId).FirstOrDefault();

                if (tokenEntry.UserId == currentEvent.EventOrganiserId)
                {
                    _dbContext.Events.Remove(currentEvent);
                    _dbContext.SaveChanges();
                    return Ok();
                }
            }
            return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);

        }

        [Route("GetEventByChannelId/{channelId}")]
        [HttpGet]
        public Event GetEventByChannelId([FromRoute] int channelId)
        {
            return _dbContext.Events.Where(x => x.ChannelId == channelId).FirstOrDefault();
        }

        [Route("LoadMostPopularEvents/{pageNumber}")]
        [HttpGet]
        public List<Event> LoadMostPopularEvents([FromRoute] int pageNumber, [FromQuery] int resultLimit = 10)
        {
            return _dbContext.Events.Where(x => true).OrderByDescending(x => x.ViewCount).Take(pageNumber * resultLimit).ToList();
        }

        [Route("LoadRecentEvents/{pageNumber}")]
        [HttpGet]
        public List<Event> LoadRecentEvents([FromRoute] int pageNumber, [FromQuery] int eventLoadLimit = 20)
        {
            return _dbContext.Events.OrderByDescending(x => x.EventCreationDate).ThenBy(x => x.ViewCount).Take(pageNumber * eventLoadLimit).ToList();
        }

        [Route("SearchEventsByDate/{date}/{pageNumber}")]
        [HttpGet]
        public List<Event> SearchEventsByDate([FromRoute] string date, [FromRoute] int pageNumber, [FromQuery] int resultLimit = 20)
        {
            return _dbContext.Events.Where(x => x.EventDate.Date == DateTime.Parse(date).Date).OrderByDescending(x => x.EventDate).ThenBy(x => x.ViewCount).Take(pageNumber * resultLimit).ToList();
        }

        [Route("SearchEventsByName/{searchCriteria}/{pageNumber}")]
        [HttpGet]
        public List<Event> SearchEventsByName([FromRoute] string searchCriteria, [FromRoute] int pageNumber, [FromQuery] int resultLimit = 20)
        {
            return _dbContext.Events.Where(x => x.EventTitle.Contains(searchCriteria)).OrderBy(x => x).Take(pageNumber * resultLimit).ToList();
        }

        [Route("UpdateEvent/{eventId}/{eventTitle}/{eventBodyText}/{eventLocation}/{eventDate}/{eventStatus}/{ticketPrice}/{eventType}/{eventVisibility}")]
        [HttpPut]
        [Authorize]
        public ActionResult UpdateEvent([FromRoute] int eventId, [FromRoute] string eventTitle, [FromRoute] string eventBodyText, [FromRoute] string eventLocation, [FromRoute] string eventDate, [FromRoute] int eventStatus, [FromRoute] float ticketPrice, [FromRoute] int eventType, [FromRoute] int eventVisibility, [FromQuery] string newTags = null, [FromQuery] int? eventCoverImageId = null, [FromQuery] int? eventTrailerVideoId = null)
        {
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(_tokenManager.ExtractToken(Request));
            var currentEvent = _dbContext.Events.Where(x => x.EventId == eventId).FirstOrDefault();

            if(tokenEntry == null)
            {
                return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
            }

            if (currentEvent == null)
            {
                return BadRequest("No event corresponding to event Id");
            }

            if (tokenEntry.UserId != currentEvent.EventOrganiserId)
            {
                return StatusCode(401, SystemResources.INCORRECT_USER_TOKEN_MESSAGE);
            }

            var currEventDate = currentEvent.EventDate;
            var newDate = DateTime.Parse(eventDate);

            if (newDate < currEventDate)
            {
                return BadRequest("New date must be greater than the current date");
            }

            currentEvent.EventTitle = eventTitle;
            currentEvent.BodyText = eventBodyText;
            currentEvent.Location = new FormalAddress(eventLocation);
            currentEvent.EventDate = newDate;
            currentEvent.EventStatus = (currEventDate.Equals(newDate)) ? currentEvent.EventStatus : EventStatus.Postponed;
            currentEvent.EventTicketPrice = ticketPrice;
            currentEvent.EventType = (EventType)eventType;
            currentEvent.EventVisibility = (VisibilityLevel)eventVisibility;
            currentEvent.EventCoverImageFileId = eventCoverImageId;
            currentEvent.EventVideoTrailerFileId = eventTrailerVideoId;
            currentEvent.EventLastModifiedDate = DateTime.Now;

            _dbContext.SaveChanges();

            _tagManager.AssignTagsToEvent(newTags, currentEvent.EventId);

            return Ok();
        }

        [Route("ViewEvent/{eventId}")]
        [HttpGet]
        public Event ViewEvent([FromRoute] int eventId)
        {
            return _dbContext.Events.Where(x => x.EventId == eventId).FirstOrDefault();
        }

        [Route("ViewUserEvents/{userId}")]
        [HttpGet]
        public List<Event> ViewUserEvents(int userId)
        {
            return _dbContext.Events.Where(x => x.EventOrganiserId == userId).ToList();
        }

        [Route("AssignFilesToEvent")]
        [HttpPut]
        public ActionResult AssignFilesToEvent([FromBody] EventFileUploadRequest request)
        {
            var currEvent = _dbContext.Events.Where(x => x.EventId == request.EventCoverImage.EventId).FirstOrDefault();
            if(currEvent != null)
            {
                if(request.EventCoverImage.UploaderId == currEvent.EventOrganiserId && request.EventVideoTrailer.UploaderId == currEvent.EventOrganiserId)
                {
                    _fileManager.AssignFilesToEvent(request);
                    return Ok();
                }
                return StatusCode(401, SystemResources.INCORRECT_USER_TOKEN_MESSAGE);
            }
            return BadRequest("No event corresponding to event Id");
        }
    }
}
