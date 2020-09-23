using Event_Management_Application.DataAccess;
using Event_Management_Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.ResourceManagement
{
    public class EventRosterManager
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        private readonly Random _randomGen;

        public EventRosterManager(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _randomGen = new Random();
        }

        public List<EventRosterEntry> GetEntriesByUser(int userId)
        {
            var retreivedEntries = _dbContext.EventRosterEntries.Where(x => x.AttendeeId == userId).ToList();
            return retreivedEntries;
        }

        public List<EventRosterEntry> GetEntriesByEvent(int eventId)
        {
            var retreivedEntries = _dbContext.EventRosterEntries.Where(x => x.EventId == eventId).ToList();
            return retreivedEntries;
        }

        public string GenerateInputCode(int userId)
        {
            string inputCode = $"{userId}";
            for(int i = 0; i < 7; i++)
            {
                inputCode += _randomGen.Next(0,9);
            }
            return inputCode;
        }

        public void UpdateEntries(ICollection<EventRosterEntry> rosterEntries)
        {
            foreach(var entry in rosterEntries)
            {
                var currEntry = _dbContext.EventRosterEntries.Where(x => x.RosterEntryId == entry.RosterEntryId).FirstOrDefault();
                if(currEntry != null)
                {
                    currEntry.CopyFields(entry);
                }
            }
            _dbContext.SaveChanges();
        }
    }
}
