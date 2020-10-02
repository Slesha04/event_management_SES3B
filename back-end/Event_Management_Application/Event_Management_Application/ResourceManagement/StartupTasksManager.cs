using Event_Management_Application.DataAccess;
using Event_Management_Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.ResourceManagement
{
    public class StartupTasksManager
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        public StartupTasksManager()
        {
            _dbContext = new EventManagementApplicationDbContext();
        }

        /// <summary>
        /// Executes all pre-defined startup scripts
        /// </summary>
        public void Run()
        {
            SetupGlobalChannel();
        }

        /// <summary>
        /// Sets up the global channel for the application
        /// </summary>
        private void SetupGlobalChannel()
        {
            var globalChannelNum = _dbContext.Channels.Where(x => x.IsGlobal).ToList().Count;
            if (globalChannelNum == 0)
            {
                Guid channelCode = Guid.NewGuid();
                _dbContext.Channels.Add(new Channel
                {
                    ChannelCode = channelCode,
                    ChannelName = "Global Chat",
                    CurrentSequenceNumber = 0,
                    IsGlobal = true
                });
            }
            else if(globalChannelNum > 1)
            {
                var removeCount = _dbContext.Channels.Where(x => x.IsGlobal).OrderBy(x => x.ChannelId).ToList().Count;
                var channelsToRemove = _dbContext.Channels.Where(x => x.IsGlobal).OrderBy(x => x.ChannelId).Take(removeCount - 1).ToList();
                _dbContext.Channels.RemoveRange(channelsToRemove);
            }
            _dbContext.SaveChanges();
        }
    }
}
