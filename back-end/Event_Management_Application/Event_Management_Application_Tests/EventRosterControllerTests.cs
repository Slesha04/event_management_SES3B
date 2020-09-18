using System;
using System.Linq;
using Event_Management_Application.Controllers;
using Event_Management_Application.DataAccess;
using Event_Management_Application.Enums;
using Event_Management_Application.Models;
using Event_Management_Application.ResourceManagement;
using Event_Management_Application.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Event_Management_Application.Controllers.Tests
{
    [TestClass]
    public class EventRosterControllerTests
    {

        private readonly EventManagementApplicationDbContext _dbContext;
        private readonly EventController _eventController;
        private readonly UserController _userController;
        private readonly EventRosterController _eventRosterController;
        private readonly HashingModule _hashingModule;

        // Environment set-up
        public EventRosterControllerTests()
        {
            _hashingModule = new HashingModule();
            _dbContext = GenerateTestDbContext();
            _eventController = SetupControllerContext(new EventController(_dbContext));
            _userController = SetupControllerContext(new UserController(_dbContext));
            _eventRosterController = SetupControllerContext(new EventRosterController(_dbContext));
        }

        [TestMethod]
        public void MarkAttendeeSelf()
        {
            bool result = false;

            // Login a valid user
            var loginActResult = _userController.LoginUser("TheRock", "password");

            // Cast as an ObjectResult to see value
            var loginObjResult = loginActResult as ObjectResult;

            // Get the token as a string
            string token = loginObjResult.Value.ToString();

            // Pass token as header
            _eventRosterController.Request.Headers.Add(SystemResources.ACCESS_TOKEN_PARAM_NAME, $"Bearer {token}");

            _eventRosterController.MarkAttendeeSelf("asdfasdf", 1);

            var newEventRoster = _dbContext.EventRosterEntries.Where(x => x.AttendeeArrived == true).FirstOrDefault();

            _eventRosterController.Request.Headers.Remove(SystemResources.ACCESS_TOKEN_PARAM_NAME);

            result = newEventRoster != null;

            Assert.IsTrue(result);
        }

        private EventController SetupControllerContext(EventController controller)
        {
            var controllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };
            controller.ControllerContext = controllerContext;
            return controller;
        }

        private UserController SetupControllerContext(UserController controller)
        {
            var controllerContext = new ControllerContext();
            controllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext = controllerContext;
            return controller;
        }

        private EventRosterController SetupControllerContext(EventRosterController controller)
        {
            var controllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };
            controller.ControllerContext = controllerContext;
            return controller;
        }

        private EventManagementApplicationDbContext GenerateTestDbContext()
        {
            var options = new DbContextOptionsBuilder<EventManagementApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "Test_Database").Options;
            var databaseContext = new EventManagementApplicationDbContext(options);
            databaseContext.Database.EnsureCreated();
            if (databaseContext.Events.Count() > 0)
            {
                return databaseContext;
            }
            databaseContext.Users.Add(new User
            {
                UserName = "SimpKing",
                UserPassword = _hashingModule.HashString("password"),
                UserGender = UserGender.Male,
                UserDob = DateTime.Now,
                UserEmail = "test@test.com"
            });
            databaseContext.Users.Add(new User
            {
                UserName = "John Stefanakis",
                UserPassword = _hashingModule.HashString("password"),
                UserGender = UserGender.Male,
                UserDob = DateTime.Now,
                UserEmail = "souvlaki@test.com"
            });
            databaseContext.Users.Add(new User
            {
                UserName = "BaysideCouncilOfficial",
                UserPassword = _hashingModule.HashString("password"),
                UserGender = UserGender.Male,
                UserDob = DateTime.Now,
                UserEmail = "sys@baysidecouncil.com.au"
            });
            databaseContext.Users.Add(new User
            {
                UserName = "TheRock",
                UserPassword = _hashingModule.HashString("password"),
                UserGender = UserGender.Male,
                UserDob = DateTime.Now,
                UserEmail = "rock_johnson@gmail.com"
            });
            databaseContext.Channels.Add(new Channel
            {
                ChannelName = "Alinity Meetup - Sydney",
                IsGlobal = false
            });
            databaseContext.Channels.Add(new Channel
            {
                ChannelName = "Backgammon Tournament 2021",
                IsGlobal = false
            });
            databaseContext.Channels.Add(new Channel
            {
                ChannelName = "NYE Fireworks - Brighton Le Sands",
                IsGlobal = false
            });
            databaseContext.FlairTags.Add(new FlairTag
            {
                TagName = "simpnation",
                UseCount = 1,
                DateCreated = DateTime.Parse("22-05-2020")
            });
            databaseContext.FlairTags.Add(new FlairTag
            {
                TagName = "nyebrighton",
                UseCount = 1,
                DateCreated = DateTime.Parse("22-05-2020")
            });
            databaseContext.EventFlairs.Add(new EventFlair
            {
                EventId = 1,
                TagName = "simpnation"
            });
            databaseContext.EventFlairs.Add(new EventFlair
            {
                EventId = 3,
                TagName = "nyebrighton"
            });
            databaseContext.Events.Add(new Event
            {
                EventTitle = "Alinity Meetup - Sydney",
                BodyText = "Alinity is coming to Sydney to cosplay and meetup with her fans.",
                Location = new FormalAddress("Sydney Olympic Park"),
                ChannelId = 1,
                EventOrganiserId = 1,
                EventDate = DateTime.Parse("12-12-2020"),
                EventCreationDate = DateTime.Parse("22-05-2020"),
                EventLastModifiedDate = DateTime.Now,
                EventVisibility = VisibilityLevel.Public,
                EventStatus = EventStatus.Active,
                EventTicketPrice = 20,
                EventType = EventType.Meetup,
                ViewCount = 10598
            });
            databaseContext.Events.Add(new Event
            {
                EventTitle = "Backgammon Tournament 2021",
                BodyText = "Mid 2021 backgammon tournament. Winner wins $50,000",
                Location = new FormalAddress("Ramsgate RSL Memorial Club"),
                ChannelId = 2,
                EventOrganiserId = 2,
                EventDate = DateTime.Parse("28-06-2021"),
                EventCreationDate = DateTime.Parse("14-08-2020"),
                EventLastModifiedDate = DateTime.Now,
                EventVisibility = VisibilityLevel.Public,
                EventStatus = EventStatus.Active,
                EventTicketPrice = 50,
                EventType = EventType.Meetup,
                ViewCount = 4922
            });
            databaseContext.Events.Add(new Event
            {
                EventTitle = "NYE Fireworks - Brighton Le Sands",
                BodyText = "Come to Brighton and see some awesome fireworks and eat out" +
                " at our great and beautiful resturants along the beach.",
                Location = new FormalAddress("Grand Parade, Brighton Le Sands"),
                ChannelId = 3,
                EventOrganiserId = 3,
                EventDate = DateTime.Parse("31-12-2020"),
                EventCreationDate = DateTime.Parse("04-09-2020"),
                EventLastModifiedDate = DateTime.Now,
                EventVisibility = VisibilityLevel.Public,
                EventStatus = EventStatus.Active,
                EventTicketPrice = 0,
                EventType = EventType.Meetup,
                ViewCount = 3117
            });
            databaseContext.Events.Add(new Event
            {
                EventTitle = "Kiama Market Festival",
                BodyText = "Come to the vibrant markets of Kiama selling the freshest and best" +
                " quality produce direct from our farmers.",
                Location = new FormalAddress("Kiama"),
                ChannelId = 3,
                EventOrganiserId = 4,
                EventDate = DateTime.Parse("19-03-2021"),
                EventCreationDate = DateTime.Parse("12-03-2020"),
                EventLastModifiedDate = DateTime.Now,
                EventVisibility = VisibilityLevel.Public,
                EventStatus = EventStatus.Active,
                EventTicketPrice = 0,
                EventType = EventType.Meetup,
                ViewCount = 1000
            });

            databaseContext.EventRosterEntries.Add(new EventRosterEntry {
                EventId = 1,
                AttendeeId = 1,
                AttendeeArrived = false,
                DateRegistered = DateTime.Parse("22-05-2020"),
                InputCode = "asdfasdf"
            });
            databaseContext.EventRosterEntries.Add(new EventRosterEntry
            {
                EventId = 2,
                AttendeeId = 2,
                AttendeeArrived = false,
                DateRegistered = DateTime.Parse("05-06-2020"),
                InputCode = "qwerqwer"
            });

            databaseContext.SaveChanges();
            return databaseContext;
        }
    }
}
