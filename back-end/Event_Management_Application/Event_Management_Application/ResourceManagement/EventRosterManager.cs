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
        public EventRosterManager(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<EventRosterEntry> GetEntriesByUser(int userId)
        {
            List<EventRosterEntry> rosterEntries = new List<EventRosterEntry>();
            var retreivedEntries = _dbContext.EventRosterEntries.Where(x => x.AttendeeId == userId).ToList();
            foreach(var entry in retreivedEntries)
            {
                // entry.User = _dbContext.Users.Where(x => x.UserId == userId).FirstOrDefault();
                // entry.Event = _dbContext.Events.Where(x => x.EventId == entry.EventId).FirstOrDefault();
                rosterEntries.Add(entry);
            }
            return rosterEntries;
        }

        public List<EventRosterEntry> GetEntriesByEvent(int eventId)
        {
            List<EventRosterEntry> rosterEntries = new List<EventRosterEntry>();
            var retreivedEntries = _dbContext.EventRosterEntries.Where(x => x.EventId == eventId).ToList();
            foreach (var entry in retreivedEntries)
            {
                // entry.User = _dbContext.Users.Where(x => x.UserId == entry.AttendeeId).FirstOrDefault();
                // entry.Event = _dbContext.Events.Where(x => x.EventId == eventId).FirstOrDefault();
                rosterEntries.Add(entry);
            }
            return rosterEntries;
        }

        public void UpdateEntries(ICollection<EventRosterEntry> rosterEntries)
        {
            foreach(var entry in rosterEntries)
            {
                var currEntry = _dbContext.EventRosterEntries.Where(x => x.RosterId == entry.RosterId).FirstOrDefault();
                if(currEntry != null)
                {
                    currEntry.CopyFields(entry);
                }
            }
            _dbContext.SaveChanges();
        }
    }
}
