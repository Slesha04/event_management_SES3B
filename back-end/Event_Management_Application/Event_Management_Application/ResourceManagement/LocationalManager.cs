using Event_Management_Application.DataAccess;
using Event_Management_Application.ResourceManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Event_Management_Application.ResourceManagement
{
    public class LocationalManager
    {
        private readonly EventManagementApplicationDbContext _dbContext;
        public LocationalManager(EventManagementApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public LocationCoordinates GetGeocodedLocation()
        {
            return null;
        }

        private async Task<string> GetGeocodedResponse(string placeName)
        {
            var geocodingClient = new HttpClient();
            var clientResponse = await geocodingClient.GetAsync($@"https://api.mapbox.com/{SystemResources.FORWARD_GEOCODING_API_BASE_URL}/0/{placeName}.json?access_token={SystemResources.MAIN_TOKEN}");
            return "";
        }
    }
}
