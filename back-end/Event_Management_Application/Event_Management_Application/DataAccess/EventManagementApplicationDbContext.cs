using Event_Management_Application.Models;
using Event_Management_Application.ResourceManagement;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.DataAccess
{
    public class EventManagementApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<UserTokenEntry> UserTokenEntries { get; set; }

        private readonly bool _isInTestingMode;

        public EventManagementApplicationDbContext(bool inTestMode = false)
        {
            _isInTestingMode = inTestMode;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // We should connect to different databases depending on whether we are going live or doing unit testing
            if(!_isInTestingMode)
            {
                optionsBuilder.UseSqlServer(SystemResources.DATABASE_CONNECTION_STRING);
            }
            else
            {
                optionsBuilder.UseSqlServer(SystemResources.TEST_DATABASE_CONNECTION_STRING);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasAlternateKey(x => x.UserName);
            modelBuilder.Entity<Event>().OwnsOne(x => x.Location);
            modelBuilder.Entity<UserTokenEntry>();
        }
    }
}
