using Microsoft.EntityFrameworkCore.Migrations;

namespace Event_Management_Application.Migrations
{
    public partial class locationnameaddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location_FullAddress",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location_LevelNumber",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location_LocationName",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location_SuiteNumber",
                table: "Events",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location_FullAddress",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Location_LevelNumber",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Location_LocationName",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Location_SuiteNumber",
                table: "Events");
        }
    }
}
