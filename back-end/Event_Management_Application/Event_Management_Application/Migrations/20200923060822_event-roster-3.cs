using Microsoft.EntityFrameworkCore.Migrations;

namespace Event_Management_Application.Migrations
{
    public partial class eventroster3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventRosterEntries_Events_EventId",
                table: "EventRosterEntries");

            migrationBuilder.DropForeignKey(
                name: "FK_EventRosterEntries_Users_UserId",
                table: "EventRosterEntries");

            migrationBuilder.DropIndex(
                name: "IX_EventRosterEntries_EventId",
                table: "EventRosterEntries");

            migrationBuilder.DropIndex(
                name: "IX_EventRosterEntries_UserId",
                table: "EventRosterEntries");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "EventRosterEntries");

            migrationBuilder.AddColumn<string>(
                name: "AttendeeUsername",
                table: "EventRosterEntries",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttendeeUsername",
                table: "EventRosterEntries");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "EventRosterEntries",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_EventRosterEntries_EventId",
                table: "EventRosterEntries",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventRosterEntries_UserId",
                table: "EventRosterEntries",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_EventRosterEntries_Events_EventId",
                table: "EventRosterEntries",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EventRosterEntries_Users_UserId",
                table: "EventRosterEntries",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
