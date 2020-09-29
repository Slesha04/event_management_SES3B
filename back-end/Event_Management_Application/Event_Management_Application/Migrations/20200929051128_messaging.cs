using Microsoft.EntityFrameworkCore.Migrations;

namespace Event_Management_Application.Migrations
{
    public partial class messaging : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CurrentSequenceNumber",
                table: "Channels",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentSequenceNumber",
                table: "Channels");
        }
    }
}
