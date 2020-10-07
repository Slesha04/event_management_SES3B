using Event_Management_Application.DataAccess;
using Event_Management_Application.ResourceManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Geocoding.Microsoft;

namespace Event_Management_Application.ResourceManagement
{
    public class LocationalManager
    {
        public LocationalManager()
        {

        }

        public LocationCoordinates GetGeocodedLocation(string location)
        {
            var addresses = GetBingAddresses(location);
            if(addresses.Result != null)
            {
                var firstAddr = addresses.Result.First();
                LocationCoordinates coords = new LocationCoordinates()
                {
                    Latitude = (firstAddr != null) ? firstAddr.Coordinates.Latitude : (double?)null,
                    Longitude = (firstAddr != null) ? firstAddr.Coordinates.Longitude : (double?)null
                };
                return coords;
            }
            return null;
        }

        private async Task<IEnumerable<BingAddress>> GetBingAddresses(string location)
        {
            BingMapsGeocoder geocoder = new BingMapsGeocoder(SystemResources.BING_API_KEY);
            var addresses = await geocoder.GeocodeAsync(location);
            return addresses;
        }
    }
}
