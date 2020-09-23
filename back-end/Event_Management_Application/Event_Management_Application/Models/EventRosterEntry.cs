using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.Models
{
    public class EventRosterEntry
    {
        [Key]
        public int RosterId { get; set; }
        public int EventId { get; set; }
        public int AttendeeId { get; set; }
        public string AttendeeUsername { get; set; }
        public bool AttendeeArrived { get; set; }
        public DateTime DateRegistered { get; set; }
        public string InputCode { get; set; }

        public void CopyFields(EventRosterEntry other)
        {
            EventId = other.EventId;
            AttendeeUsername = other.AttendeeUsername;
            AttendeeId = other.AttendeeId;
            AttendeeArrived = other.AttendeeArrived;
            DateRegistered = other.DateRegistered;
            InputCode = other.InputCode;
        }
    }
}
