using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Event_Management_Application.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    EventId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EventTitle = table.Column<string>(nullable: true),
                    BodyText = table.Column<string>(nullable: true),
                    Location_AddressApartmentNumber = table.Column<string>(nullable: true),
                    Location_AddressBuildingNumber = table.Column<string>(nullable: true),
                    Location_AddressStreetName = table.Column<string>(nullable: true),
                    Location_AddressSuburbName = table.Column<string>(nullable: true),
                    Location_AddressCityName = table.Column<string>(nullable: true),
                    Location_AddressStateName = table.Column<string>(nullable: true),
                    Location_AddressCountryName = table.Column<string>(nullable: true),
                    Location_AddressPostcode = table.Column<string>(nullable: true),
                    EventOrganiserId = table.Column<int>(nullable: false),
                    EventDate = table.Column<DateTime>(nullable: false),
                    EventCreationDate = table.Column<DateTime>(nullable: false),
                    EventLastModifiedDate = table.Column<DateTime>(nullable: false),
                    EventCoverImageFileId = table.Column<int>(nullable: false),
                    EventVideoTrailerFileId = table.Column<int>(nullable: false),
                    EventVisibility = table.Column<int>(nullable: false),
                    EventStatus = table.Column<int>(nullable: false),
                    EventTicketPrice = table.Column<float>(nullable: false),
                    EventType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.EventId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserName = table.Column<string>(nullable: false),
                    UserDob = table.Column<DateTime>(nullable: false),
                    UserDesc = table.Column<string>(nullable: true),
                    UserGender = table.Column<int>(nullable: false),
                    UserEmail = table.Column<string>(nullable: true),
                    UserMobile = table.Column<string>(nullable: true),
                    UserLandline = table.Column<string>(nullable: true),
                    ProfilePicture = table.Column<byte[]>(nullable: true),
                    UserPassword = table.Column<string>(nullable: true),
                    UserVerified = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.UniqueConstraint("AK_Users_UserName", x => x.UserName);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
