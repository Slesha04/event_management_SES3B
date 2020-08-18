using Event_Management_Application.Enums;
using Event_Management_Application.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.Controllers.Interfaces
{
    public interface IEventController
    {
        List<Event> LoadRecentEvents(int pageNumber, int eventLoadLimit = 20);
        Event ViewEvent(int eventId);
        ActionResult CreateEvent(string eventTitle, string eventBodyText, string eventLocation, string eventDate, float ticketPrice, int eventType, int eventVisibility, string tags = null, int? eventCoverImageId = null, int? eventTrailerVideoId = null);
        ActionResult UpdateEvent(int eventId, string eventTitle, string eventBodyText, string eventLocation, string eventDate, int eventStatus, float ticketPrice, int eventType, int eventVisibility, string newTags = null, int? eventCoverImageId = null, int? eventTrailerVideoId = null);
        ActionResult DeleteEvent(int eventId);
        Event GetEventByChannelId(int channelId);
        List<Event> SearchEventsByName(string searchCriteria, int pageNumber, int resultLimit = 20);
        List<Event> SearchEventsByDate(string date, int pageNumber, int resultLimit = 20);
        List<Event> LoadMostPopularEvents(int pageNumber, int resultLimit = 10);
    }
}
