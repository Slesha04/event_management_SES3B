using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.Models
{
    [NotMapped]
    public class EventManagementJwtToken : JwtSecurityToken
    {
        public string EncodedForm { get; set; }
    }
}
