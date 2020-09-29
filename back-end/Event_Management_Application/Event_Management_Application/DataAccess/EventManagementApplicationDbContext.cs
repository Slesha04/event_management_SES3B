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
        public DbSet<Channel> Channels { get; set; }
        public DbSet<EventFlair> EventFlairs { get; set; }
        public DbSet<FlairTag> FlairTags { get; set; }
        public DbSet<Medium> Media { get; set; }
        public DbSet<EventRosterEntry> EventRosterEntries { get; set; }
        public DbSet<Message> Messages { get; set; }

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
            modelBuilder.Entity<User>().ToTable("Users").HasAlternateKey(x => x.UserName);
            modelBuilder.Entity<Event>().ToTable("Events").OwnsOne(x => x.Location);
            modelBuilder.Entity<UserTokenEntry>().ToTable("UserTokenEntries");
            modelBuilder.Entity<Channel>().ToTable("Channels");
            modelBuilder.Entity<EventFlair>().ToTable("EventFlairs");
            modelBuilder.Entity<FlairTag>().ToTable("FlairTags");
            modelBuilder.Entity<Medium>().ToTable("Media");
            modelBuilder.Entity<EventRosterEntry>().ToTable("EventRosterEntries");
            modelBuilder.Entity<Message>().ToTable("Messages");
        }
    }
}
