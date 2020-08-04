using Event_Management_Application.Enums;
using System;

namespace Event_Management_Application.Models.Interfaces
{
    public interface IUser
    {
        int UserId { get; set; }
        string UserName { get; set; }
        DateTime UserDob { get; set; }
        string UserDesc { get; set; }
        UserGender UserGender { get; set; }
        string UserEmail { get; set; }
        string UserMobile { get; set; }
        string UserLandline { get; set; }
        byte[] ProfilePicture { get; set; }
        string UserPassword { get; set; }
        bool UserVerified { get; set; }
    }
}
