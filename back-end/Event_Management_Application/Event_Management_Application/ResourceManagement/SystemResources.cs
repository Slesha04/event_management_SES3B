namespace Event_Management_Application.ResourceManagement
{
    public static class SystemResources
    {
        public const string DATABASE_CONNECTION_STRING = @"Data Source=localhost\SQLEXPRESS;Initial Catalog=Event_Management_DB;Trusted_Connection=true";
        public const string AZURE_ADMIN_ACCOUNT_PASS = "eventmanagement124!";
        public const string PROD_DATABASE_STRING = "Server=tcp:event-management-applicationdbserver.database.windows.net,1433;Initial Catalog=Event_Management_Application_db;Persist Security Info=False;User ID=sysadmin;Password=eventmanagement124!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        public const string TOKEN_SECURITY_KEY = "6170ac834a44388f4f419f48605f887f162fcb1ccdd7c2108bdde362c307096f";
        public const string VALID_ISSUER = "eventmanagementsys";
        public const string VALID_AUDIENCE = "users";
        public const string ACCESS_TOKEN_PARAM_NAME = "Authorization";
        public const string INVALID_TOKEN_MESSAGE = "Invalid Token";
        public const string SWAGGER_API_DESCRIPTION = "Automated documentation and UI for API usage. " +
            "The authentication method for APIs requiring credentials, is to use JWT Bearer tokens. " +
            "To test this on Swagger, type in the 'Authorization' dialog box, 'Bearer [token_contents]'. " +
            "Then click 'Authorize' and 'Close' to continue. ";
        public const string INCORRECT_USER_TOKEN_MESSAGE = "User is not Authroized to perform such an action";
        public const string INCORRECT_INPUT_CODE = "Incorrect Input Code!";
        public const string MAIN_TOKEN = "sk.eyJ1IjoibWFwZW1vdXQ2OSIsImEiOiJja2FtOXh5MnUxYmhiMnFsNmMwNmxwbmFtIn0.AKofJ9yQWDqgrA2JsZyrIQ";
        public const string FORWARD_GEOCODING_API_BASE_URL = "geocoding/v5/";
    }
}
