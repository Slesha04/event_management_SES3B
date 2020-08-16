using System.Text.RegularExpressions;

namespace Event_Management_Application.Models
{
    public class FormalAddress
    {
        public string SuiteNumber { get; set; }
        public string LevelNumber { get; set; }
        public string AddressApartmentNumber { get; set; }
        public string AddressBuildingNumber { get; set; }
        public string AddressStreetName { get; set; }
        public string AddressSuburbName { get; set; }
        public string AddressCityName { get; set; }
        public string AddressStateName { get; set; }
        public string AddressCountryName { get; set; }
        public string AddressPostcode { get; set; }
        public string LocationName { get; set; }
        public string FullAddress { get; set; }

        public FormalAddress()
        {

        }

        public FormalAddress(string address)
        {
            if(IsValidAddress(address))
            {
                SetAddress(address);
            }
            else
            {
                LocationName = address;
            }
        }

        public void SetAddress(string address)
        {
            SuiteNumber = Regex.Match(address, @"Suite[\s][0-9]*").Value;
            LevelNumber = Regex.Match(address, @"Level[\s][0-9]*").Value;
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
            UpdateFullAddress();
        }

        public void UpdateFullAddress()
        {
            FullAddress = ToString();
        }

        // Basically address has to be in this form (spaces included - "[Unit Number]/" is optional): [Unit Number]/[Building Number] [Street Name] [Suburb Name] [CityName (e.g. Sydney)] [State Name] [Country Name] [Postcode]
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
            var suiteNumber = (SuiteNumber != null) ? $"{SuiteNumber} " : "";
            var levelNumber = (LevelNumber != null) ? $"{LevelNumber} " : "";
            var apartmentNumber = AddressApartmentNumber ?? "";
            var slash = (string.IsNullOrEmpty(AddressApartmentNumber)) ? "" : "/";
            var buildingNumber = AddressBuildingNumber ?? "";
            var streetName = AddressStreetName ?? "";
            var suburbName = AddressSuburbName ?? "";
            var cityName = AddressCityName ?? "";
            var stateName = AddressStateName ?? "";
            var countryName = AddressCountryName ?? "";
            var postcode = AddressPostcode ?? "";
            return $"{suiteNumber}{levelNumber}{apartmentNumber}{slash}{buildingNumber} {streetName} {suburbName} {cityName} {stateName} {countryName} {postcode}";
        }

        public bool Equals(FormalAddress other)
        {
            return ToString().Equals(other.ToString());
        }
    }
}
