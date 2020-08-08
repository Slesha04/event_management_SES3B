using Event_Management_Application.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Event_Management_Application.Controllers.Interfaces
{
    public interface IUserController
    {
        ActionResult LoginUser(string userName, string hashedPassword);
        Task<ActionResult> LogoutUser();
        Task<ActionResult> ViewUser();
        ActionResult RegisterUser(string userName, string dob, int gender, string userEmail, string userPassword);
        Task<ActionResult> UpdateUser(int userId, string userName, string dob, int gender, string userEmail, string userPassword, string mobilePhone, string landline, byte[] profilePicture, string userDesc);
        Task<ActionResult> DeleteUser();
        ActionResult GetUserById(int userId);
    }
}
