using Event_Management_Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.Controllers.ResponseModels
{
    public class RosterEntryResponse
    {
        public EventRosterEntry RosterEntry { get; set; }
        public string EventOrganiserUsername { get; set; }
        public string EventTitle { get; set; }
    }
}
