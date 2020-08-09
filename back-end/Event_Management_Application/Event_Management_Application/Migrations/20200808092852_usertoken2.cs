using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Event_Management_Application.Migrations
{
    public partial class usertoken2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey("PK_UserTokenEntries", "UserTokenEntries");
            migrationBuilder.AlterColumn<string>(
                name: "TokenId",
                table: "UserTokenEntries",
                nullable: false,
                oldClrType: typeof(Guid));
            migrationBuilder.AddPrimaryKey("PK_UserTokenEntries", "UserTokenEntries", "TokenId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "TokenId",
                table: "UserTokenEntries",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
