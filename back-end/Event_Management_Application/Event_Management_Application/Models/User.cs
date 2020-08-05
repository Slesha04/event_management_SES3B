using Event_Management_Application.Enums;
using Event_Management_Application.Models.Interfaces;
using System;

namespace Event_Management_Application.Models
{
    public class User : IUser
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public DateTime UserDob { get; set; }
        public string UserDesc { get; set; }
        public UserGender UserGender { get; set; }
        public string UserEmail { get; set; }
        public string UserMobile { get; set; }
        public string UserLandline { get; set; }
        public byte[] ProfilePicture { get; set; }
        public string UserPassword { get; set; }
        public bool UserVerified { get; set; }
    }
}
