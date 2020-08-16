using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Event_Management_Application.Models
{
    public class EventFlair
    {
        [Key]
        public int EventFlairId { get; set; }
        public int EventId { get; set; }

        [ForeignKey("EventId")]
        public Event Event { get; set; }
        public string TagName { get; set; }

        [ForeignKey("TagName")]
        public FlairTag FlairTag { get; set; }
    }
}
