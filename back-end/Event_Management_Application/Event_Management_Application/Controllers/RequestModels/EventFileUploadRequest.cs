using Event_Management_Application.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.Controllers.RequestModels
{
    [NotMapped]
    public class EventFileUploadRequest
    {
        public Medium EventCoverImage { get; set; }
        public Medium EventVideoTrailer { get; set; }
    }
}
