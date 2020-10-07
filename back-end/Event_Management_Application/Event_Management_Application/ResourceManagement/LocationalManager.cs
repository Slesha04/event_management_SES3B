using Event_Management_Application.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.ResourceManagement
{
    public class LocationalManager
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        public LocationalManager(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        
    }
}
