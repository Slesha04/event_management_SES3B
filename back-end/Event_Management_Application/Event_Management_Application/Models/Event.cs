﻿using Event_Management_Application.Enums;
using Event_Management_Application.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.Models
{
    public class Event : IEvent
    {
        public int EventId { get; set; }
        public string EventTitle { get; set; }
        public string BodyText { get; set; }
        public string Location { get; set; }
        public int EventOrganiserId { get; set; }
        public DateTime EventDate { get; set; }
        public DateTime EventCreationDate { get; set; }
        public DateTime EventLastModifiedDate { get; set; }
        public int EventCoverImageFileId { get; set; }
        public int EventVideoTrailerFileId { get; set; }
        public VisibilityLevel EventVisibility { get; set; }
        public EventStatus EventStatus { get; set; }
        public float EventTicketPrice { get; set; }
        public EventType EventType { get; set; }
    }
}
