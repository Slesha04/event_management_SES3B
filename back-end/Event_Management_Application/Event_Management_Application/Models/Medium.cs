using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.Models
{
    public class Medium
    {
        [Key]
        public int FileId { get; set; }
        public string FileName { get; set; }
        public byte[] FileContent { get; set; }
        public float FileSize { get; set; }
        public int EventId { get; set; }
        public int ChannelId { get; set; }

        [ForeignKey("ChannelId")]
        public Channel Channel { get; set; }
    }
}
