using Event_Management_Application.Models.Interfaces;

namespace Event_Management_Application.Controllers.Interfaces
{
    public interface IUserController
    {
        string LoginUser(string userName, string hashedPassword);
        bool LogoutUser(string tokenId);
        IUser ViewUser(string tokenId);
        string RegisterUser(string userName, string dob, int gender, string userEmail, string userPassword);
        bool UpdateUser(int userId, string userName, string dob, int gender, string userEmail, string userPassword, string mobilePhone, string landline, byte[] profilePicture, string userDesc, string tokenId);
        bool DeleteUser(string tokenId);
        IUser GetUserById(int userId);
    }
}
