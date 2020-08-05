using Event_Management_Application.Models;
using Event_Management_Application.ResourceManagement;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.DataAccess
{
    public class EventManagementApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(SystemResources.DATABASE_CONNECTION_STRING);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasAlternateKey(x => x.UserName);
            modelBuilder.Entity<Event>().OwnsOne(x => x.Location);
        }
    }
}
