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

namespace Event_Management_Application_Tests
{
    [TestClass]
    public class EventControllerTests
    {

        private readonly EventManagementApplicationDbContext _dbContext;
        private readonly EventController _eventController;
        private readonly UserController _userController;
        private readonly HashingModule _hashingModule;

        // Environment set-up
        public EventControllerTests()
        {
            _hashingModule = new HashingModule();
            _dbContext = GenerateTestDbContext();
            _eventController = SetupControllerContext(new EventController(_dbContext));
            _userController = SetupControllerContext(new UserController(_dbContext));
        }

        // Create new event if logged in
        [TestMethod]
        public void CreateEvent()
        {
            bool result = false;

            // Login a valid user
            var loginActResult = _userController.LoginUser("TheRock", "password");

            // Cast as an ObjectResult to see value
            var loginObjResult = loginActResult as ObjectResult;

            // Get the token as a string
            string token = loginObjResult.Value.ToString();

            // Pass token as header
            _eventController.Request.Headers.Add(SystemResources.ACCESS_TOKEN_PARAM_NAME, $"Bearer {token}");
            _userController.Request.Headers.Add(SystemResources.ACCESS_TOKEN_PARAM_NAME, $"Bearer {token}");

            _eventController.CreateEvent("HSP Eating Competition"
                , "Hey brothers, I will be hosting a massive HSP eating competition at my" +
                " establishment. Prize tiers are: 1st - $10,000\n" +
                "2nd - $5,000\n" +
                "3rd - $1,000", "488 Princes Hwy Rockdale NSW 2216", "22-09-2021", 0, 3, 0,
                "kebab,eating,competition");

            var user = (User)(_userController.ViewUser() as ObjectResult).Value;

            _eventController.Request.Headers.Remove(SystemResources.ACCESS_TOKEN_PARAM_NAME);
            _userController.Request.Headers.Remove(SystemResources.ACCESS_TOKEN_PARAM_NAME);

            var newEvent = _dbContext.Events.Where(x => x.EventTitle.Equals("HSP Eating Competition") && x.EventOrganiserId == user.UserId).FirstOrDefault();

            result = newEvent != null;

            Assert.IsTrue(result);
        }

        // Delete event by id if you are the organiser and logged in
        [TestMethod]
        public void DeleteEvent()
        {
            bool result = false;

            // Login a valid user
            var loginActResult = _userController.LoginUser("BaysideCouncilOfficial", "password");

            // Cast as an ObjectResult to see value
            var loginObjResult = loginActResult as ObjectResult;

            // Get the token as a string
            string token = loginObjResult.Value.ToString();

            // Pass token as header
            _eventController.Request.Headers.Add(SystemResources.ACCESS_TOKEN_PARAM_NAME, $"Bearer {token}");

            _eventController.DeleteEvent(4);

            _eventController.Request.Headers.Remove(SystemResources.ACCESS_TOKEN_PARAM_NAME);

            var deletedEvent = _dbContext.Events.Where(x => x.EventId == 4).FirstOrDefault();

            result = deletedEvent == null;

            Assert.IsTrue(result);
        }

        // Get Event object by the channel Id it is associated with
        [TestMethod]
        public void GetEventByChannelId()
        {
            bool result = false;

            var foundEvent = _eventController.GetEventByChannelId(1);

            result = foundEvent.EventId == 1;

            Assert.IsTrue(result);
        }

        // Load most popular events given a page number and a given result limit per page
        [TestMethod]
        public void LoadMostPopularEvents()
        {
            bool result = false;

            var mostPopular = _eventController.LoadMostPopularEvents(1, 2);

            result = mostPopular.Where(x => x.ViewCount >= 10000).FirstOrDefault() != null;
                //&& mostPopular.Where(x => x.EventId == 2).FirstOrDefault() != null;

            Assert.IsTrue(result);
        }

        // Load the most recently created events given a page number and a given result limit per page
        [TestMethod]
        public void LoadRecentEvents()
        {
            bool result = false;

            var mostRecent = _eventController.LoadRecentEvents(1, 2);

            result = mostRecent.Where(x => x.EventId == 2).FirstOrDefault() != null
                && mostRecent.Where(x => x.EventId == 3).FirstOrDefault() != null;

            Assert.IsTrue(result);
        }

        // Get events that are occuring on a given date given a page number and a given result limit per page
        [TestMethod]
        public void SearchEventsByDate()
        {
            bool result = false;

            var searchResults = _eventController.SearchEventsByDate("28-06-2021", 1, 1);

            result = searchResults.Where(x => x.EventId == 2).FirstOrDefault() != null;

            Assert.IsTrue(result);
        }

        // Search for events where the amalgamation of the event title and the tag names it is associated with contains the characters in the search criteria
        // For example, searchCriteria = "2000's_Hits" => "George's Retro Party|houseparty,2000's_Hits,disco,shots" where the form is "EventTitle|EventFlairTags"
        [TestMethod]
        public void SearchEventsByName()
        {
            bool result = false;

            //var tagSearchResults = _eventController.SearchEventsByName("simpnation", 1, 1);

            var nameSearchResults = _eventController.SearchEventsByName("Backgammon", 1, 1);

            result = nameSearchResults.Where(x => x.EventTitle.Contains("Backgammon")).FirstOrDefault() != null;

            Assert.IsTrue(result);
        }

        // Update event information given new criteria
        [TestMethod]
        public void UpdateEvent()
        {
            bool result = false;

            // Login a valid user
            var loginActResult = _userController.LoginUser("John Stefanakis", "password");

            // Cast as an ObjectResult to see value
            var loginObjResult = loginActResult as ObjectResult;

            // Get the token as a string
            string token = loginObjResult.Value.ToString();

            // Pass token as header
            _eventController.Request.Headers.Add(SystemResources.ACCESS_TOKEN_PARAM_NAME, $"Bearer {token}");

            _eventController.UpdateEvent(2, "Backgammon Tournament 2021"
                ,"Mid 2021 backgammon tournament. Winner wins $25,000"
                ,"Ramsgate RSL Memorial Club", "28-06-2021", 0, 0, 3, 0);

            _eventController.Request.Headers.Remove(SystemResources.ACCESS_TOKEN_PARAM_NAME);

            var updatedEvent = _dbContext.Events.Where(x => x.EventId == 2).FirstOrDefault();

            result = updatedEvent.BodyText.Equals("Mid 2021 backgammon tournament. Winner wins $25,000");

            Assert.IsTrue(result);
        }

        // Get event by event Id
        [TestMethod]
        public void ViewEvent()
        {
            bool result = false;

            var selectedEvent = _eventController.ViewEvent(1);

            result = selectedEvent.EventId == 1;

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

        private EventManagementApplicationDbContext GenerateTestDbContext()
        {
            var options = new DbContextOptionsBuilder<EventManagementApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "Test_Database").Options;
            var databaseContext = new EventManagementApplicationDbContext(options);
            var databaseCreated = databaseContext.Database.EnsureCreated();
            if(databaseContext.Events.Count() > 0)
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
            databaseContext.Channels.Add(new Channel {
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
            databaseContext.FlairTags.Add(new FlairTag {
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
            databaseContext.EventFlairs.Add(new EventFlair {
                EventId = 1,
                TagName = "simpnation"
            });
            databaseContext.EventFlairs.Add(new EventFlair
            {
                EventId = 3,
                TagName = "nyebrighton"
            });
            databaseContext.Events.Add(new Event {
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
                EventCreationDate = DateTime.Now,
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
                EventCreationDate = DateTime.Now,
                EventLastModifiedDate = DateTime.Now,
                EventVisibility = VisibilityLevel.Public,
                EventStatus = EventStatus.Active,
                EventTicketPrice = 0,
                EventType = EventType.Meetup,
                ViewCount = 1000
            });
            databaseContext.SaveChanges();
            return databaseContext;
        }
    }
}
