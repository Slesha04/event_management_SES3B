using Event_Management_Application.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.Models.Interfaces
{
    public interface IEvent
    {
        int EventId { get; set; }
        string EventTitle { get; set; }
        string BodyText { get; set; }
        string Location { get; set; }
        int EventOrganiserId { get; set; }
        DateTime EventDate { get; set; }
        DateTime EventCreationDate { get; set; }
        DateTime EventLastModifiedDate { get; set; }
        int EventCoverImageFileId { get; set; }
        int EventVideoTrailerFileId { get; set; }
        VisibilityLevel EventVisibility { get; set; }
        EventStatus EventStatus { get; set; }
        float EventTicketPrice { get; set; }
        EventType EventType { get; set; }
    }
}
