using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Event_Management_Application.Models
{
    public class FlairTag
    {
        [Key]
        public string TagName { get; set; }
        public int UseCount { get; set; }
        public DateTime DateCreated { get; set; }
        public ICollection<EventFlair> EventFlairs { get; set; }
    }
}
