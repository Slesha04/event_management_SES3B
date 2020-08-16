using Event_Management_Application.Controllers.Interfaces;
using Event_Management_Application.Enums;
using Event_Management_Application.Models;
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
        public EventController()
        {

        }

        [Route("CreateEvent/{eventTitle}/{eventBodyText}/{eventLocation}/{eventDate}/{tags}/{eventCoverImageId?}/{eventTrailerVideoId?}")]
        [HttpPut]
        [Authorize]
        public ActionResult CreateEvent([FromRoute] string eventTitle, [FromRoute] string eventBodyText, [FromRoute] string eventLocation, [FromRoute] string eventDate, [FromRoute] string tags, [FromRoute] int? eventCoverImageId, [FromRoute] int? eventTrailerVideoId)
        {
            throw new NotImplementedException();
        }

        [Route("DeleteEvent/{eventId}")]
        [HttpDelete]
        [Authorize]
        public ActionResult DeleteEvent([FromRoute] int eventId)
        {
            throw new NotImplementedException();
        }

        [Route("GetEventByChannelId/{channelId}")]
        [HttpGet]
        public Event GetEventByChannelId([FromRoute] int channelId)
        {
            throw new NotImplementedException();
        }

        [Route("LoadMostPopularEvents/{pageNumber}/{resultLimit?}")]
        [HttpGet]
        public List<Event> LoadMostPopularEvents([FromRoute] int pageNumber, [FromRoute] int resultLimit = 10)
        {
            throw new NotImplementedException();
        }

        [Route("LoadRecentEvents/{pageNumber}/{eventLoadLimit?}")]
        [HttpGet]
        public List<Event> LoadRecentEvents([FromRoute] int pageNumber, [FromRoute] int eventLoadLimit = 20)
        {
            throw new NotImplementedException();
        }

        [Route("SearchEventsByDate/{date}/{pageNumber}/{resultLimit?}")]
        [HttpGet]
        public List<Event> SearchEventsByDate([FromRoute] string date, [FromRoute] int pageNumber, [FromRoute] int resultLimit = 20)
        {
            throw new NotImplementedException();
        }

        [Route("SearchEventsByName/{searchCriteria}/{pageNumber}/{resultLimit?}")]
        [HttpGet]
        public List<Event> SearchEventsByName([FromRoute] string searchCriteria, [FromRoute] int pageNumber, [FromRoute] int resultLimit = 20)
        {
            throw new NotImplementedException();
        }

        [Route("UpdateEvent/{eventId}/{eventTitle}/{eventBodyText}/{eventLocation}/{eventDate}/{eventStatus}/{eventCoverImageId?}/{eventTrailerVideoId?}")]
        [HttpPut]
        [Authorize]
        public ActionResult UpdateEvent([FromRoute] int eventId, [FromRoute] string eventTitle, [FromRoute] string eventBodyText, [FromRoute] string eventLocation, [FromRoute] string eventDate, [FromRoute] int eventStatus, [FromRoute] int? eventCoverImageId, [FromRoute] int? eventTrailerVideoId)
        {
            throw new NotImplementedException();
        }

        [Route("ViewEvent/{eventId}")]
        [HttpGet]
        public Event ViewEvent([FromRoute] int eventId)
        {
            throw new NotImplementedException();
        }
    }
}
