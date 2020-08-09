using Event_Management_Application.DataAccess;
using Event_Management_Application.Models;
using Event_Management_Application.ResourceManagement;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace Event_Management_Application.Security
{
    public class TokenManager
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        public TokenManager(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string IssueToken(User user)
        {
            var securityKey = SystemResources.TOKEN_SECURITY_KEY;
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));

            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                    issuer: SystemResources.VALID_ISSUER,
                    audience: SystemResources.VALID_AUDIENCE,
                    expires: DateTime.Now.AddHours(24),
                    signingCredentials: signingCredentials
                );

            var writtenToken = new JwtSecurityTokenHandler().WriteToken(token);

            _dbContext.UserTokenEntries.Add(new UserTokenEntry() {
                TokenId = writtenToken,
                UserId = user.UserId,
                User = user,
                TokenIssueDate = DateTime.Now,
                TokenExpiryDate = token.ValidTo
            });

            _dbContext.SaveChanges();

            return writtenToken;
        }

        public bool DestroyToken(string token)
        {
            try
            {
                var userTokenEntry = _dbContext.UserTokenEntries.Where(x => x.TokenId.Equals(token)).FirstOrDefault();
                if (userTokenEntry != null)
                {
                    _dbContext.UserTokenEntries.Remove(userTokenEntry);
                    _dbContext.SaveChanges();
                    return true;
                }
            }
            catch(Exception)
            {
                return false;
            }
            return false;
        }

        public string ExtractToken(HttpRequest request)
        {
            return request.Headers[SystemResources.ACCESS_TOKEN_PARAM_NAME].ToString().Replace("Bearer ", "");
        }

        public UserTokenEntry ValidateAndReturnTokenEntry(string token)
        {
            var tokenEntry = _dbContext.UserTokenEntries.Where(x => x.TokenId.Equals(token)).FirstOrDefault();
            if(tokenEntry != null)
            {
                if(tokenEntry.TokenExpiryDate <= DateTime.Now)
                {
                    _dbContext.UserTokenEntries.Remove(tokenEntry);
                    _dbContext.SaveChanges();
                    return null;
                }
                tokenEntry.User = GetUserByTokenEntry(tokenEntry);
                return tokenEntry;
            }
            else
            {
                return null;
            }
        }
        
        public User GetUserByTokenEntry(UserTokenEntry entry)
        {
            return _dbContext.Users.Where(x => x.UserId == entry.UserId).FirstOrDefault();
        }
    }
}
