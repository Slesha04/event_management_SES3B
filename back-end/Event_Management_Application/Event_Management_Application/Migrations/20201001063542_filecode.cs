using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Event_Management_Application.Migrations
{
    public partial class filecode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AuthorId",
                table: "Messages",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "AuthorUsername",
                table: "Messages",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "FileCode",
                table: "Media",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "UploaderId",
                table: "Media",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "AuthorUsername",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "FileCode",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "UploaderId",
                table: "Media");
        }
    }
}
