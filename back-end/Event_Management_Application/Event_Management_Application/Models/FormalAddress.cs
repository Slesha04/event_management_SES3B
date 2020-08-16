using System.Text.RegularExpressions;

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

        public FormalAddress()
        {

        }

        public FormalAddress(string address)
        {
            AddressApartmentNumber = Regex.Match(address, "[0-9](?=/)").Value;
            AddressBuildingNumber = Regex.Match(address, @"[0-9]*[-][0-9]*(?=\s)").Value;
            string remainingAddress = Regex.Match(address, @"(?<=[\s])[aA-zZ\s]*[0-9]*").Value;
            string[] remAddComponents = remainingAddress.Split(' ');
            AddressStreetName = remAddComponents[0];
            AddressSuburbName = remAddComponents[1];
            AddressCityName = remAddComponents[2];
            AddressStateName = remAddComponents[3];
            AddressCountryName = remAddComponents[4];
            AddressPostcode = remAddComponents[5];
        }

        public static bool IsValidAddress(string address)
        {
            string remainingAddress = Regex.Match(address, @"(?<=[\s])[aA-zZ\s]*[0-9]*").Value;
            string[] remAddComponents = remainingAddress.Split(' ');
            return !Regex.Match(address, @"[0-9]*[-][0-9]*(?=\s)").Value.Equals(string.Empty)
                && remainingAddress.Split(' ').Length == 6
                && Regex.IsMatch(remAddComponents[5], "[0-9]*");
        }

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
