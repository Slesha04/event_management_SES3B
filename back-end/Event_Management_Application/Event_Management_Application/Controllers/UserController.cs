using System;
using System.Linq;
using Event_Management_Application.Controllers.Interfaces;
using Event_Management_Application.Models;
using Event_Management_Application.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Event_Management_Application.Security;
using Microsoft.AspNetCore.Authorization;
using Event_Management_Application.Enums;
using Event_Management_Application.ResourceManagement;

namespace Event_Management_Application.Controllers
{
    ///
    ///<summary>This controller provides back-end functionality for all user-related functions.
    ///Such as signing in, out and registration. Also allows users to update, view or delete their
    ///accounts.</summary>
    ///
    [Route("api/UserController")]
    [ApiController]
    public class UserController : ControllerBase, IUserController
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        private readonly TokenManager _tokenManager;
        private readonly HashingModule _hashingModule;

        public UserController(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _tokenManager = new TokenManager(_dbContext);
            _hashingModule = new HashingModule();
        }

        ///
        ///<summary>Allows the user to delete their own account
        /// User must be authenticated to use this function</summary>
        ///
        [Route("DeleteUser")]
        [HttpDelete]
        [Authorize]
        public ActionResult DeleteUser()
        {
            var token = _tokenManager.ExtractToken(Request);
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(token);

            if (tokenEntry != null)
            {
                var user = tokenEntry.User;

                if(user != null)
                {
                    _dbContext.Users.Remove(user);
                    _dbContext.SaveChanges();
                    return Ok();
                }
                return BadRequest("Bad Token Supplied");
            }
            else
            {
                return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
            }
        }

        ///
        ///<summary>Gets details about a user using a userId.</summary>
        ///
        [Route("GetUserById/{userId}")]
        [HttpGet]
        public User GetUserById([FromRoute] int userId)
        {
            return _dbContext.Users.Where(x => x.UserId == userId).FirstOrDefault();
        }

        ///
        ///<summary>Allows a user to sign in and issues them a JWT token.</summary>
        ///
        [Route("LoginUser/{userName}/{password}")]
        [HttpGet]
        public ActionResult LoginUser([FromRoute] string userName, [FromRoute] string password)
        {
            var user = _dbContext.Users.Where(x => x.UserName.Equals(userName) && x.UserPassword.Equals(_hashingModule.HashString(password))).FirstOrDefault();
            if(user != null)
            {
               return Ok(_tokenManager.IssueToken(user));
            }
            return StatusCode(401, "Supplied Credentials are Invalid");
        }

        ///
        ///<summary>Logs out a user by destroying all their tokens.
        /// User must be authenticated to use this function</summary>
        ///
        [Route("LogoutUser")]
        [HttpPost]
        [Authorize]
        public ActionResult LogoutUser()
        {
            var token = _tokenManager.ExtractToken(Request);
            var logoutSuccess = _tokenManager.DestroyUserTokens(token);
            if(logoutSuccess)
            {
                return Ok();
            }
            return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
        }

        ///
        ///<summary>Registers a new user into the system then issues a token for that user.</summary>
        ///
        [Route("RegisterUser/{userName}/{dob}/{gender}/{userEmail}/{userPassword}")]
        [HttpGet]
        public ActionResult RegisterUser([FromRoute] string userName, [FromRoute] string dob, [FromRoute] int gender, [FromRoute] string userEmail, [FromRoute] string userPassword)
        {
            var user = new User() {
                UserName = userName,
                UserPassword = _hashingModule.HashString(userPassword),
                UserDob = DateTime.Parse(dob),
                UserGender = (UserGender)gender,
                UserEmail = userEmail,
                UserVerified = false
            };

            if(_dbContext.Users.Where(x => x.UserName.Equals(user.UserName)).FirstOrDefault() != null)
            {
                return BadRequest("Username is already taken");
            }
            else
            {
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
            }

            return Ok(_tokenManager.IssueToken(user));

        }

        ///
        ///<summary>Updates user information by using UserId. 
        /// User must be authenticated to use this function</summary>
        ///
        [Route("UpdateUser/{userId}/{userName}/{dob}/{gender}/{userEmail}/{userPassword}/{mobilePhone}/{landline}/{profilePicture}/{userDesc}")]
        [HttpPut]
        [Authorize]
        public ActionResult UpdateUser([FromRoute] int userId, [FromRoute] string userName, [FromRoute] string dob, [FromRoute] int gender, [FromRoute] string userEmail, [FromRoute] string userPassword, [FromRoute] string mobilePhone, [FromRoute] string landline, [FromRoute] byte[] profilePicture, [FromRoute] string userDesc)
        {
            var token = _tokenManager.ExtractToken(Request);
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(token);

            if(tokenEntry == null)
            {
                return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
            }

            if (tokenEntry.UserId != userId)
            {
                return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
            }

            var user = tokenEntry.User;

            if(user != null)
            {
                user.UserName = userName;
                user.UserDob = DateTime.Parse(dob);
                user.UserGender = (UserGender)gender;
                user.UserEmail = userEmail;
                user.UserPassword = _hashingModule.HashString(userPassword);
                user.UserMobile = mobilePhone;
                user.UserLandline = landline;
                user.ProfilePicture = profilePicture;
                user.UserDesc = userDesc;
                _dbContext.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest("User Id is not valid");
            }
        }

        ///
        ///<summary>Allows a user to view their own profile 
        /// User must be authenticated to use this function</summary>
        ///
        [Route("ViewUser")]
        [HttpGet]
        [Authorize]
        public ActionResult ViewUser()
        {
            var token = _tokenManager.ExtractToken(Request);
            var tokenEntry = _tokenManager.ValidateAndReturnTokenEntry(token);

            if(tokenEntry != null)
            {
                return Ok(tokenEntry.User);
            }
            else
            {
                return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
            }
        }
    }
}