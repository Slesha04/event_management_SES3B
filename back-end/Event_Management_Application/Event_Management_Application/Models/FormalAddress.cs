using Event_Management_Application.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event_Management_Application.Models
{
    public class FormalAddress
    {
        public string AddressApartmentNumber { get; set; }
        public string AddressBuildingNumber { get; set; }
        public string AddressStreetName { get; set; }
        public string AddressSuburbName { get; set; }
        public string AddressCityName { get; set; }
        public string AddressStateName { get; set; }
        public string AddressCountryName { get; set; }
        public string AddressPostcode { get; set; }

        public override string ToString()
        {
            var apartmentNumber = AddressApartmentNumber ?? "";
            var slash = (string.IsNullOrEmpty(AddressApartmentNumber)) ? "" : "/";
            var buildingNumber = AddressBuildingNumber ?? "";
            var streetName = AddressStreetName ?? "";
            var suburbName = AddressSuburbName ?? "";
            var cityName = AddressCityName ?? "";
            var stateName = AddressStateName ?? "";
            var countryName = AddressCountryName ?? "";
            var postcode = AddressPostcode ?? "";
            return $"{apartmentNumber}{slash}{buildingNumber} {streetName} {suburbName} {cityName} {stateName} {countryName} {postcode}";
        }

        public bool Equals(FormalAddress other)
        {
            return ToString().Equals(other.ToString());
        }
    }
}
