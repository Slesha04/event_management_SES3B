using Event_Management_Application.DataAccess;
using Event_Management_Application.Models;
using Event_Management_Application.ResourceManagement;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;

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

            var claims = new List<Claim>();

            var jwtId = Guid.NewGuid().ToString();
            var utcDate = EpochTime.GetIntDate(DateTime.Now);

            claims.Add(new Claim("iat", $"{utcDate}", ClaimValueTypes.Integer64));
            claims.Add(new Claim("jti", jwtId));
            claims.Add(new Claim("user_id", $"{user.UserId}", ClaimValueTypes.Integer32));

            var token = new JwtSecurityToken(
                    issuer: SystemResources.VALID_ISSUER,
                    audience: SystemResources.VALID_AUDIENCE,
                    expires: DateTime.Now.AddHours(24),
                    signingCredentials: signingCredentials,
                    claims: claims
                );

            var writtenToken = new JwtSecurityTokenHandler().WriteToken(token);

            _dbContext.UserTokenEntries.Add(new UserTokenEntry() {
                TokenId = writtenToken,
                UserId = user.UserId,
                User = user,
                TokenIssueDate = token.IssuedAt,
                TokenExpiryDate = token.ValidTo
            });

            _dbContext.SaveChanges();

            return writtenToken;
        }

        public bool DestroyUserTokens(string token)
        {
            try
            {
                var userTokenEntry = _dbContext.UserTokenEntries.Where(x => x.TokenId.Equals(token)).FirstOrDefault();
                var userTokens = _dbContext.UserTokenEntries.Where(x => x.UserId == userTokenEntry.UserId).ToList();
                if (userTokenEntry != null)
                {
                    _dbContext.UserTokenEntries.RemoveRange(userTokens);
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
