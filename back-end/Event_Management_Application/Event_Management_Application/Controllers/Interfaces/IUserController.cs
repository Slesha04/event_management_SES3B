using Event_Management_Application.Models;
using Microsoft.AspNetCore.Mvc;

namespace Event_Management_Application.Controllers.Interfaces
{
    public interface IUserController
    {
        ActionResult LoginUser(string userName, string hashedPassword);
        ActionResult LogoutUser();
        ActionResult ViewUser();
        ActionResult RegisterUser(string userName, string dob, int gender, string userEmail, string userPassword);
        ActionResult UpdateUser(int userId, string userName, string dob, int gender, string userEmail, string userPassword, string mobilePhone, string landline, byte[] profilePicture, string userDesc);
        ActionResult DeleteUser();
        User GetUserById(int userId);
    }
}
