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

        public void AssignChannelToEvent(ref Event newEvent)
        {
            if(newEvent.ChannelId == 0)
            {
                _dbContext.Channels.Add(new Channel
                {
                    ChannelName = newEvent.EventTitle,
                    ChannelCode = newEvent.ChannelCode,
                    IsGlobal = false,
                    CurrentSequenceNumber = 0
                });
                _dbContext.SaveChanges();

                var channelCode = newEvent.ChannelCode;
                var channel = _dbContext.Channels.Where(x => x.ChannelCode.Equals(channelCode)).FirstOrDefault();

                newEvent.ChannelId = channel.ChannelId;
                _dbContext.SaveChanges();
            }
        }
    }
}
