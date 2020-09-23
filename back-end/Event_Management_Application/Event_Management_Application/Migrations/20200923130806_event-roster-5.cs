using Microsoft.EntityFrameworkCore.Migrations;

namespace Event_Management_Application.Migrations
{
    public partial class eventroster5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RosterId",
                table: "EventRosterEntries",
                newName: "RosterEntryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RosterEntryId",
                table: "EventRosterEntries",
                newName: "RosterId");
        }
    }
}
