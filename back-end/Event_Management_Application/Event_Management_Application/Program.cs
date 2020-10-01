using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Event_Management_Application.ResourceManagement;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Event_Management_Application
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Runs tasks that need to be ran before performing any operations
            StartupTasksManager manager = new StartupTasksManager();
            manager.Run();

            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
