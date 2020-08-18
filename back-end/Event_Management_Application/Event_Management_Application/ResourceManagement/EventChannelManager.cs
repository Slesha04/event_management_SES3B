using Event_Management_Application.DataAccess;
using Event_Management_Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.ResourceManagement
{
    public class EventChannelManager
    {
        private readonly EventManagementApplicationDbContext _dbContext;

        public EventChannelManager(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AssignChannelToEvent(int eventId)
        {
            var currEvent = _dbContext.Events.Where(x => x.EventId == eventId).FirstOrDefault();

            if(currEvent.ChannelId == 0)
            {
                _dbContext.Channels.Add(new Channel
                {
                    ChannelName = currEvent.EventTitle,
                    IsGlobal = false,
                });
                _dbContext.SaveChanges();

                var channel = _dbContext.Channels.Where(x => x.ChannelName.Equals(currEvent.EventTitle)).OrderByDescending(x => x.ChannelId).FirstOrDefault();

                currEvent.ChannelId = channel.ChannelId;
            }
        }
    }
}
