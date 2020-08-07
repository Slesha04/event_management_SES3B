using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Event_Management_Application.Migrations
{
    public partial class usertokens : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserTokenEntries",
                columns: table => new
                {
                    TokenId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    TokenIssueDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTokenEntries", x => x.TokenId);
                    table.ForeignKey(
                        name: "FK_UserTokenEntries_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_EventOrganiserId",
                table: "Events",
                column: "EventOrganiserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTokenEntries_UserId",
                table: "UserTokenEntries",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Users_EventOrganiserId",
                table: "Events",
                column: "EventOrganiserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Users_EventOrganiserId",
                table: "Events");

            migrationBuilder.DropTable(
                name: "UserTokenEntries");

            migrationBuilder.DropIndex(
                name: "IX_Events_EventOrganiserId",
                table: "Events");
        }
    }
}
