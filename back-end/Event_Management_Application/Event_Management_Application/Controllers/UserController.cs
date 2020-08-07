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

namespace Event_Management_Application.Controllers
{
    [Route("api/UserController")]
    [ApiController]
    public class UserController : ControllerBase, IUserController
    {
        private readonly EventManagementApplicationDbContext _dbContext;

        // Making the parameter optional allows for unit testing to become possible
        public UserController(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [Route("DeleteUser/{tokenId}")]
        [HttpDelete]
        public void DeleteUser([FromRoute] string tokenId)
        {
            throw new NotImplementedException();
        }

        [Route("GetUserById/{userId}")]
        [HttpGet]
        public User GetUserById([FromRoute] int userId)
        {
            throw new NotImplementedException();
        }

        [Route("LoginUser/{userName}/{hashedPassword}")]
        [HttpGet]
        public string LoginUser([FromRoute] string userName, [FromRoute] string hashedPassword)
        {
            throw new NotImplementedException();
        }

        [Route("LogoutUser/{tokenId}")]
        [HttpPost]
        public void LogoutUser([FromRoute] string tokenId)
        {
            throw new NotImplementedException();
        }

        [Route("RegisterUser/{userName}/{dob}/{gender}/{userEmail}/{userPassword}")]
        [HttpGet]
        public string RegisterUser([FromRoute] string userName, [FromRoute] string dob, [FromRoute] int gender, [FromRoute] string userEmail, [FromRoute] string userPassword)
        {
            throw new NotImplementedException();
        }

        [Route("UpdateUser/{userId}/{userName}/{dob}/{gender}/{userEmail}/{userPassword}/{mobilePhone}/{landline}/{profilePicture}/{userDesc}/{tokenId}")]
        [HttpPut]
        public void UpdateUser([FromRoute] int userId, [FromRoute] string userName, [FromRoute] string dob, [FromRoute] int gender, [FromRoute] string userEmail, [FromRoute] string userPassword, [FromRoute] string mobilePhone, [FromRoute] string landline, [FromRoute] byte[] profilePicture, [FromRoute] string userDesc, [FromRoute] string tokenId)
        {
            throw new NotImplementedException();
        }

        [Route("ViewUser/{tokenId}")]
        [HttpGet]
        public User ViewUser([FromRoute] string tokenId)
        {
            throw new NotImplementedException();
        }
    }
}