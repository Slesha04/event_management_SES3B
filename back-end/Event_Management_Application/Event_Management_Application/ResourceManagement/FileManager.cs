using Event_Management_Application.Controllers.RequestModels;
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

        public void AssignFilesToEvent(EventFileUploadRequest request)
        {
            Guid imageCode = Guid.NewGuid();
            var coverImage = new Medium()
            {
                FileName = request.EventCoverImage.FileName,
                FileContent = request.EventCoverImage.FileContent,
                FileSize = request.EventCoverImage.FileSize,
                ChannelId = null,
                UploaderId = request.EventCoverImage.UploaderId,
                EventId = request.EventCoverImage.EventId,
                DateUploaded = DateTime.Now
            };

            Guid videoCode = Guid.NewGuid();
            var videoTrailer = new Medium()
            {
                FileName = request.EventVideoTrailer.FileName,
                FileContent = request.EventVideoTrailer.FileContent,
                FileSize = request.EventVideoTrailer.FileSize,
                ChannelId = null,
                UploaderId = request.EventVideoTrailer.UploaderId,
                EventId = request.EventVideoTrailer.EventId,
                DateUploaded = DateTime.Now
            };

            var currEvent = _dbContext.Events.Where(x => x.EventId == coverImage.EventId).FirstOrDefault();
            var currCoverImage = _dbContext.Media.Where(x => x.ChannelId == null && x.EventId == currEvent.EventId && x.UploaderId == coverImage.UploaderId).FirstOrDefault();
            var currVidTrailer = _dbContext.Media.Where(x => x.ChannelId == null && x.EventId == currEvent.EventId && x.UploaderId == videoTrailer.UploaderId).FirstOrDefault();

            if(currCoverImage != null)
            {
                _dbContext.Media.Remove(currCoverImage);
            }

            if(currVidTrailer != null)
            {
                _dbContext.Media.Remove(currVidTrailer);
            }

            _dbContext.Media.Add(coverImage);
            _dbContext.Media.Add(videoTrailer);

            var retCoverImage = _dbContext.Media.Where(x => x.ChannelId == null && x.EventId == currEvent.EventId && x.UploaderId == coverImage.UploaderId).FirstOrDefault();
            var retVidTrailer = _dbContext.Media.Where(x => x.ChannelId == null && x.EventId == currEvent.EventId && x.UploaderId == videoTrailer.UploaderId).FirstOrDefault();

            currEvent.EventCoverImageFileId = retCoverImage.FileId;
            currEvent.EventVideoTrailerFileId = retVidTrailer.FileId;

            _dbContext.SaveChanges();
        }
    }
}
