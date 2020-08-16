using Event_Management_Application.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Event_Management_Application.Models
{
    public class Event
    {
        public int EventId { get; set; }
        public string EventTitle { get; set; }
        public string BodyText { get; set; }
        public FormalAddress Location { get; set; }
        public int ChannelId { get; set; }

        [ForeignKey("ChannelId")]
        public Channel Channel { get; set; }
        public int EventOrganiserId { get; set; }

        [ForeignKey("EventOrganiserId")]
        public User EventOrganiser { get; set; }
        public DateTime EventDate { get; set; }
        public DateTime EventCreationDate { get; set; }
        public DateTime EventLastModifiedDate { get; set; }
        public int? EventCoverImageFileId { get; set; }

        [ForeignKey("EventCoverImageFileId")]
        public Medium EventCoverImageFile { get; set; }
        public int? EventVideoTrailerFileId { get; set; }

        [ForeignKey("EventVideoTrailerFileId")]
        public Medium EventVideoTrailerFile { get; set; }
        public VisibilityLevel EventVisibility { get; set; }
        public EventStatus EventStatus { get; set; }
        public float EventTicketPrice { get; set; }
        public EventType EventType { get; set; }
        public int ViewCount { get; set; }
        public ICollection<EventFlair> EventFlairs { get; set; }
    }
}
