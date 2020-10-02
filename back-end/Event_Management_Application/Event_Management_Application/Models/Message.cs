using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.Models
{
    public class Message
    {
        [Key]
        public int MessageId { get; set; }
        public string MessageText { get; set; }
        public int ChannelId { get; set; }

        [ForeignKey("ChannelId")]
        public Channel Channel { get; set; }
        public DateTime DatePosted { get; set; }
        public int SequenceNumber { get; set; }
        public string AuthorUsername { get; set; }
        public int AuthorId { get; set; }
    }
}
