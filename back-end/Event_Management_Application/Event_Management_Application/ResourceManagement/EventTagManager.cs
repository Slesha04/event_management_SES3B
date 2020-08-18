using Event_Management_Application.DataAccess;
using Event_Management_Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.ResourceManagement
{
    public class EventTagManager
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        public EventTagManager(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AssignTagsToEvent(string tags, int eventId)
        {
            var tagList = ProcessTags(tags);
            foreach(var tag in tagList)
            {
                _dbContext.EventFlairs.Add(new EventFlair {
                    TagName = tag,
                    EventId = eventId
                });
            }
        }

        private List<string> ProcessTags(string tags)
        {
            var tagList = new List<string>();
            if (!string.IsNullOrEmpty(tags))
            {
                string[] eventTagNames = tags.Split(',');
                foreach (var eventTagName in eventTagNames)
                {
                    var formattedTag = ReformatTagName(eventTagName);

                    if (!formattedTag.Equals(string.Empty))
                    {
                        var tag = _dbContext.FlairTags.Where(x => x.TagName.Equals(formattedTag)).FirstOrDefault();
                        if (tag != null)
                        {
                            tag.UseCount++;
                            tagList.Add(tag.TagName);
                            _dbContext.SaveChanges();
                        }
                        else
                        {
                            _dbContext.FlairTags.Add(new FlairTag
                            {
                                TagName = formattedTag,
                                UseCount = 1,
                                DateCreated = DateTime.Now
                            });
                            _dbContext.SaveChanges();
                            tagList.Add(formattedTag);
                        }
                    }
                }
            }
            return tagList;
        }

        private string ReformatTagName(string tagName)
        {
            return tagName.Replace(' ', char.MinValue);
        }
    }
}
