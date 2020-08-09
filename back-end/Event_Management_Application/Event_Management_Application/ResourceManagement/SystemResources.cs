﻿namespace Event_Management_Application.ResourceManagement
{
    public static class SystemResources
    {
        public const string DATABASE_CONNECTION_STRING = @"Data Source=localhost\SQLEXPRESS;Initial Catalog=Event_Management_DB;Trusted_Connection=true";
        public const string TEST_DATABASE_CONNECTION_STRING = @"Data Source=localhost\SQLEXPRESS;Initial Catalog=Event_Management_Test_DB;Trusted_Connection=true";
        public const string TOKEN_SECURITY_KEY = "6170ac834a44388f4f419f48605f887f162fcb1ccdd7c2108bdde362c307096f";
        public const string VALID_ISSUER = "eventmanagementsys";
        public const string VALID_AUDIENCE = "users";
        public const string ACCESS_TOKEN_PARAM_NAME = "Authorization";
        public const string INVALID_TOKEN_MESSAGE = "Invalid Token";
        public const string SWAGGER_API_DESCRIPTION = "Automated documentation and UI for API usage. " +
            "The authentication method for APIs requiring credentials, is to use JWT Bearer tokens. " +
            "To test this on Swagger, type in the 'Authorization' dialog box, 'Bearer [token_contents]'. " +
            "Then click 'Authorize' and 'Close' to continue. ";
    }
}
