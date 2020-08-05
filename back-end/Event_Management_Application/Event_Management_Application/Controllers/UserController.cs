using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Event_Management_Application.Controllers.Interfaces;
using Event_Management_Application.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Event_Management_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase, IUserController
    {
        public bool DeleteUser(string tokenId)
        {
            throw new NotImplementedException();
        }

        public IUser GetUserById(int userId)
        {
            throw new NotImplementedException();
        }

        public string LoginUser(string userName, string hashedPassword)
        {
            throw new NotImplementedException();
        }

        public bool LogoutUser(string tokenId)
        {
            throw new NotImplementedException();
        }

        public string RegisterUser(string userName, string dob, int gender, string userEmail, string userPassword)
        {
            throw new NotImplementedException();
        }

        public bool UpdateUser(int userId, string userName, string dob, int gender, string userEmail, string userPassword, string mobilePhone, string landline, byte[] profilePicture, string userDesc, string tokenId)
        {
            throw new NotImplementedException();
        }

        public IUser ViewUser(string tokenId)
        {
            throw new NotImplementedException();
        }
    }
}