using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Event_Management_Application.Controllers.Interfaces;
using Event_Management_Application.Models;
using Event_Management_Application.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Event_Management_Application.ResourceManagement;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Event_Management_Application.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;

namespace Event_Management_Application.Controllers
{
    [Route("api/UserController")]
    [ApiController]
    public class UserController : ControllerBase, IUserController
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        private readonly TokenManager _tokenManager;

        // Making the parameter optional allows for unit testing to become possible
        public UserController(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _tokenManager = new TokenManager(_dbContext);
        }

        [Route("DeleteUser")]
        [HttpDelete]
        [Authorize]
        public async Task<ActionResult> DeleteUser()
        {
            throw new NotImplementedException();
        }

        [Route("GetUserById/{userId}")]
        [HttpGet]
        public ActionResult GetUserById([FromRoute] int userId)
        {
            throw new NotImplementedException();
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
        public async Task<ActionResult> LogoutUser()
        {
            var token = await HttpContext.GetTokenAsync("access_token");
            var logoutSuccess = _tokenManager.DestroyToken(token);
            if(logoutSuccess)
            {
                return Ok();
            }
            return BadRequest("Token not valid");
        }

        [Route("RegisterUser/{userName}/{dob}/{gender}/{userEmail}/{userPassword}")]
        [HttpGet]
        public ActionResult RegisterUser([FromRoute] string userName, [FromRoute] string dob, [FromRoute] int gender, [FromRoute] string userEmail, [FromRoute] string userPassword)
        {
            throw new NotImplementedException();
        }

        [Route("UpdateUser/{userId}/{userName}/{dob}/{gender}/{userEmail}/{userPassword}/{mobilePhone}/{landline}/{profilePicture}/{userDesc}")]
        [HttpPut]
        [Authorize]
        public async Task<ActionResult> UpdateUser([FromRoute] int userId, [FromRoute] string userName, [FromRoute] string dob, [FromRoute] int gender, [FromRoute] string userEmail, [FromRoute] string userPassword, [FromRoute] string mobilePhone, [FromRoute] string landline, [FromRoute] byte[] profilePicture, [FromRoute] string userDesc)
        {
            throw new NotImplementedException();
        }

        [Route("ViewUser")]
        [HttpGet]
        [Authorize]
        public async Task<ActionResult> ViewUser()
        {
            throw new NotImplementedException();
        }
    }
}