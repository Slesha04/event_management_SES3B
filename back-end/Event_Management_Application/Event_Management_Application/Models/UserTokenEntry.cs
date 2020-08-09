using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.Models
{
    public class UserTokenEntry
    {
        [Key]
        public string TokenId { get; set; }
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
        public DateTime TokenIssueDate { get; set; }
        public DateTime TokenExpiryDate { get; set; }
    }
}
