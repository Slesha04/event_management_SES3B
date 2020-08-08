namespace Event_Management_Application.ResourceManagement
{
    public static class SystemResources
    {
        public const string DATABASE_CONNECTION_STRING = @"Data Source=localhost\SQLEXPRESS;Initial Catalog=Event_Management_DB;Trusted_Connection=true";
        public const string TEST_DATABASE_CONNECTION_STRING = @"Data Source=localhost\SQLEXPRESS;Initial Catalog=Event_Management_Test_DB;Trusted_Connection=true";
        public const string TOKEN_SECURITY_KEY = "6170ac834a44388f4f419f48605f887f162fcb1ccdd7c2108bdde362c307096f";
        public const string VALID_ISSUER = "eventmanagementsys";
        public const string VALID_AUDIENCE = "users";
    }
}
