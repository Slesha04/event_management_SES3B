using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.Models
{
    public class Channel
    {
        public int ChannelId { get; set; }
        public string ChannelName { get; set; }
        public byte[] ChannelImage { get; set; }
        public bool IsGlobal { get; set; }
        public Guid ChannelCode { get; set; }
        public int CurrentSequenceNumber { get; set; }
        public ICollection<Medium> Media { get; set; }
    }
}
