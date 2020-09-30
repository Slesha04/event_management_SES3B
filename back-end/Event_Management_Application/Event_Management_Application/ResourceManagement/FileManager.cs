using Event_Management_Application.DataAccess;
using Event_Management_Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.ResourceManagement
{
    public class FileManager
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        public FileManager(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddFilesToChannel(ICollection<Medium> files, int channelId, int eventId, int userId)
        {
            foreach (var file in files)
            {
                _dbContext.Media.Add(new Medium()
                {
                    FileName = file.FileName,
                    FileContent = file.FileContent,
                    FileSize = file.FileSize,
                    EventId = eventId,
                    ChannelId = channelId,
                    UploaderId = userId
                });
            }
            _dbContext.SaveChanges();
        }

        public void RemoveFilesFromChannel(ICollection<int> fileIds)
        {
            var filesToRemove = _dbContext.Media.Where(x => fileIds.Contains(x.FileId)).ToList();
            _dbContext.RemoveRange(filesToRemove);
            _dbContext.SaveChanges();
        }
    }
}
