using System;
using System.Linq;
using Event_Management_Application.Controllers;
using Event_Management_Application.DataAccess;
using Event_Management_Application.Enums;
using Event_Management_Application.Models;
using Event_Management_Application.ResourceManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Event_Management_Application_Tests
{
    [TestClass]
    public class UserControllerTests
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        private readonly UserController _userController;

        // Environment set-up
        public UserControllerTests()
        {
            _dbContext = GenerateTestDbContext();
            _userController = SetupControllerContext(new UserController(_dbContext));
        }

        [TestMethod]
        public void LoginUser()
        {
            bool result = false;

            // Login a valid user
            var actionResult = _userController.LoginUser("TestUser", "password");

            // Cast as an ObjectResult to see value
            var objectResult = actionResult as ObjectResult;

            // Get the token as a string
            string token = objectResult.Value.ToString();

            // Check to see if the token was successfully stored in the database
            var storedToken = _dbContext.UserTokenEntries.Where(x => x.TokenId.Equals(token)).FirstOrDefault();

            // Was it successfully stored?
            result = storedToken != null;

            // If it was, then the test passes, if it wasn't there is an error with the logic
            Assert.IsTrue(result);
        }

        [TestMethod]
        public void LogoutUser()
        {
            bool result = false;

            // Login a valid user
            var loginActResult = _userController.LoginUser("TestUser", "password");

            // Cast as an ObjectResult to see value
            var loginObjResult = loginActResult as ObjectResult;

            // Get the token as a string
            string token = loginObjResult.Value.ToString();

            // Get the login token entry for user
            var loginToken = _dbContext.UserTokenEntries.Where(x => x.TokenId.Equals(token)).FirstOrDefault();

            // Pass token as header
            _userController.Request.Headers.Add(SystemResources.ACCESS_TOKEN_PARAM_NAME, $"Bearer {token}");

            // Logout user
            var logoutActResult = _userController.LogoutUser();

            // Dispose of header data when task is done
            _userController.Request.Headers.Remove(SystemResources.ACCESS_TOKEN_PARAM_NAME);

            // Cast as an ObjectResult to see value
            var logoutObjResult = logoutActResult as ObjectResult;

            // Get number of user tokens for user
            var userTokens = _dbContext.UserTokenEntries.Where(x => x.UserId == loginToken.UserId).ToList().Count;

            // There should be no login tokens for the user
            result = userTokens == 0;

            // If there are no tokens, the user is logged out, otherwise this function failed
            Assert.IsTrue(result);
        }

        [TestMethod]
        public void RegisterUser()
        {
            bool result = false;

            // Register a new user
            var regActResult = _userController.RegisterUser("Rodger", "12/05/1998", 0, "test3@test.com", "pass");

            // Cast as ObjectResult to view contents
            var regObjResult = regActResult as ObjectResult;

            // Get token as string
            string token = regObjResult.Value.ToString();

            // Get token entry from database
            var tokenEntry = _dbContext.UserTokenEntries.Where(x => x.TokenId.Equals(token)).FirstOrDefault();

            // Find the registered user
            var registeredUser = _dbContext.Users.Where(x => x.UserName.Equals("Rodger")).FirstOrDefault();

            // Is the user present and has the token been stored in the database and issued?
            if(tokenEntry != null)
            {
                result = registeredUser != null && token.Contains(tokenEntry.TokenId);
            }

            // If so, test case passes
            Assert.IsTrue(result);
        }

        [TestMethod]
        public void ViewUser()
        {
            bool result = false;

            // Login a valid user
            var loginActResult = _userController.LoginUser("TestUser", "password");

            // Cast as an ObjectResult to see value
            var loginObjResult = loginActResult as ObjectResult;

            // Get the token as a string
            string token = loginObjResult.Value.ToString();

            // Pass token as header
            _userController.Request.Headers.Add(SystemResources.ACCESS_TOKEN_PARAM_NAME, $"Bearer {token}");

            // Request to view user details
            var viewUserActResult = _userController.ViewUser();

            // Dispose of header data when task is done
            _userController.Request.Headers.Remove(SystemResources.ACCESS_TOKEN_PARAM_NAME);

            // Cast as ObjectResult to get contents
            var viewUserObjResult = viewUserActResult as ObjectResult;

            // Get user details
            var user = (User)viewUserObjResult.Value;

            // Did any user details get retreived and did it retreive the right details
            if(user != null)
            {
                result = user.UserName.Equals("TestUser");
            }

            // If the right user details is retreived then the case passes.
            Assert.IsTrue(result);

        }

        [TestMethod]
        public void GetUserById()
        {
            bool result = false;

            // The id number to use
            int userId = 1;

            // Get user using an Id number
            var user = _userController.GetUserById(userId);

            // Get user from the database using the same Id number
            var dbUser = _dbContext.Users.Where(x => x.UserId == userId).FirstOrDefault();

            // Are the two users a match?
            if (dbUser != null)
            {
                result = dbUser.Equals(user);
            }
            else
            {
                result = user == null;
            }

            // If so, then it passes the test case
            Assert.IsTrue(result);
        }

        [TestMethod]
        public void UpdateUser()
        {
            bool result = false;

            // Login a valid user
            var loginActResult = _userController.LoginUser("TestUserToUpdate", "password");

            // Cast as an ObjectResult to see value
            var loginObjResult = loginActResult as ObjectResult;

            // Get the token as a string
            string token = loginObjResult.Value.ToString();

            // Pass token as header
            _userController.Request.Headers.Add(SystemResources.ACCESS_TOKEN_PARAM_NAME, $"Bearer {token}");

            // Update user's dob, email and user description
            _userController.UpdateUser(3, "TestUserToUpdate", "11-01-1974", 0, "update@test.com", 
                "password", null, null, null, "Updated.");

            // Dispose of header data when task is done
            _userController.Request.Headers.Remove(SystemResources.ACCESS_TOKEN_PARAM_NAME);

            // Get user that should be updated
            var user = _dbContext.Users.Where(x => x.UserId == 3).FirstOrDefault();

            // Check if updates have been applied
            if(user != null)
            {
                result = user.UserDob.Equals(DateTime.Parse("11-01-1974")) && 
                    user.UserEmail.Equals("update@test.com") && user.UserDesc.Equals("Updated.");
            }

            // If so, then the test case passes
            Assert.IsTrue(result);

        }

        [TestMethod]
        public void DeleteUser()
        {
            bool result = false;

            // Login a valid user
            var loginActResult = _userController.LoginUser("TestUserToDelete", "password");

            // Cast as an ObjectResult to see value
            var loginObjResult = loginActResult as ObjectResult;

            // Get the token as a string
            string token = loginObjResult.Value.ToString();

            // Pass token as header
            _userController.Request.Headers.Add(SystemResources.ACCESS_TOKEN_PARAM_NAME, $"Bearer {token}");

            // Tell the controller to delete the user
            _userController.DeleteUser();

            // Dispose of header data when task is done
            _userController.Request.Headers.Remove(SystemResources.ACCESS_TOKEN_PARAM_NAME);

            // Try to find the user
            var user = _dbContext.Users.Where(x => x.UserName.Equals("TestUserToDelete")).FirstOrDefault();

            // Can the deleted user still be found?
            result = user == null;

            // If not, then the test case passes
            Assert.IsTrue(result);
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
            var databseContext = new EventManagementApplicationDbContext(options);
            databseContext.Database.EnsureCreated();
            databseContext.Users.Add(new User
            {
                UserName = "TestUser",
                UserPassword = "password",
                UserGender = UserGender.Male,
                UserDob = DateTime.Now,
                UserEmail = "test@test.com"
            });
            databseContext.Users.Add(new User
            {
                UserName = "TestUserToDelete",
                UserPassword = "password",
                UserGender = UserGender.Male,
                UserDob = DateTime.Now,
                UserEmail = "test2@test.com"
            });
            databseContext.Users.Add(new User
            {
                UserName = "TestUserToUpdate",
                UserPassword = "password",
                UserGender = UserGender.Male,
                UserDob = DateTime.Now,
                UserEmail = "test3@test.com"
            });
            databseContext.SaveChanges();
            return databseContext;
        }
    }
}
