using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Event_Management_Application.Controllers.Interfaces;
using Event_Management_Application.DataAccess.Interfaces;
using Event_Management_Application.Models;
using Event_Management_Application.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Event_Management_Application.Controllers
{
    [Route("api/UserController")]
    [ApiController]
    public class UserController : ControllerBase, IUserController
    {
        private readonly IApplicationDbContext _dbContext;

        public UserController(IApplicationDbContext dbContext = null)
        {
            _dbContext = dbContext ?? new EventManagementApplicationDbContext();
        }

        [Route("DeleteUser/{tokenId}")]
        [HttpDelete]
        public void DeleteUser([FromRoute] string tokenId)
        {
            throw new NotImplementedException();
        }

        [Route("GetUserById/{userId}")]
        [HttpGet]
        public User GetUserById(int userId)
        {
            throw new NotImplementedException();
        }

        [Route("LoginUser/{userName}/{hashedPassword}")]
        [HttpGet]
        public string LoginUser(string userName, string hashedPassword)
        {
            throw new NotImplementedException();
        }

        [Route("LogoutUser/{tokenId}")]
        [HttpPost]
        public void LogoutUser(string tokenId)
        {
            throw new NotImplementedException();
        }

        [Route("RegisterUser/{userName}/{dob}/{gender}/{userEmail}/{userPassword}")]
        [HttpGet]
        public string RegisterUser(string userName, string dob, int gender, string userEmail, string userPassword)
        {
            throw new NotImplementedException();
        }

        [Route("UpdateUser/{userId}/{userName}/{dob}/{gender}/{userEmail}/{userPassword}/{mobilePhone}/{landline}/{profilePicture}/{userDesc}/{tokenId}")]
        [HttpPut]
        public void UpdateUser(int userId, string userName, string dob, int gender, string userEmail, string userPassword, string mobilePhone, string landline, byte[] profilePicture, string userDesc, string tokenId)
        {
            throw new NotImplementedException();
        }

        [Route("ViewUser/{tokenId}")]
        [HttpGet]
        public User ViewUser(string tokenId)
        {
            throw new NotImplementedException();
        }
    }
}