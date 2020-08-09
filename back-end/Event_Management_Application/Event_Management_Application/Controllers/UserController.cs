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
    [Route("api/UserController")]
    [ApiController]
    public class UserController : ControllerBase, IUserController
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        private readonly TokenManager _tokenManager;

        public UserController(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _tokenManager = new TokenManager(_dbContext);
        }

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

        [Route("GetUserById/{userId}")]
        [HttpGet]
        public User GetUserById([FromRoute] int userId)
        {
            return _dbContext.Users.Where(x => x.UserId == userId).FirstOrDefault();
        }

        [Route("LoginUser/{userName}/{hashedPassword}")]
        [HttpGet]
        public ActionResult LoginUser([FromRoute] string userName, [FromRoute] string hashedPassword)
        {
            var user = _dbContext.Users.Where(x => x.UserName.Equals(userName) && x.UserPassword.Equals(hashedPassword)).FirstOrDefault();
            if(user != null)
            {
               return Ok(_tokenManager.IssueToken(user));
            }
            return StatusCode(401, "Supplied Credentials are Invalid");
        }

        [Route("LogoutUser")]
        [HttpPost]
        [Authorize]
        public ActionResult LogoutUser()
        {
            var token = _tokenManager.ExtractToken(Request);
            var logoutSuccess = _tokenManager.DestroyToken(token);
            if(logoutSuccess)
            {
                return Ok();
            }
            return StatusCode(401, SystemResources.INVALID_TOKEN_MESSAGE);
        }

        [Route("RegisterUser/{userName}/{dob}/{gender}/{userEmail}/{userPassword}")]
        [HttpGet]
        public ActionResult RegisterUser([FromRoute] string userName, [FromRoute] string dob, [FromRoute] int gender, [FromRoute] string userEmail, [FromRoute] string userPassword)
        {
            var user = new User() {
                UserName = userName,
                UserPassword = userPassword,
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
                user.UserPassword = userPassword;
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