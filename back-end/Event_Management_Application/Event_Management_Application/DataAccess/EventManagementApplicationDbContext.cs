using Event_Management_Application.Models;
using Event_Management_Application.ResourceManagement;
using Microsoft.EntityFrameworkCore;

namespace Event_Management_Application.DataAccess
{
    public class EventManagementApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<UserTokenEntry> UserTokenEntries { get; set; }

        public EventManagementApplicationDbContext()
        {

        }

        public EventManagementApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            if(Database.IsInMemory())
            {
                modelBuilder.Entity<User>().ToTable("Users").HasAlternateKey(x => x.UserName);
                modelBuilder.Entity<Event>().ToTable("Events").OwnsOne(x => x.Location);
                modelBuilder.Entity<UserTokenEntry>().ToTable("UserTokenEntries");
            }
            else
            {
                modelBuilder.Entity<User>().ToTable("Users").HasAlternateKey(x => x.UserName);
                modelBuilder.Entity<Event>().ToTable("Events").OwnsOne(x => x.Location);
                modelBuilder.Entity<UserTokenEntry>().ToTable("UserTokenEntries");
            }
        }
    }
}
