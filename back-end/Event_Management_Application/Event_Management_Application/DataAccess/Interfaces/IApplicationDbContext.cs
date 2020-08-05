using Event_Management_Application.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.DataAccess.Interfaces
{
    // Sets the standard for a usuable Application Database Context
    public interface IApplicationDbContext
    {
        DbSet<User> Users { get; set; }
        DbSet<Event> Events { get; set; }
    }
}
