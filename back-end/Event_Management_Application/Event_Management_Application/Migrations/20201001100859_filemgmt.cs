using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Event_Management_Application.Migrations
{
    public partial class filemgmt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Media_Channels_ChannelId",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "FileCode",
                table: "Media");

            migrationBuilder.AlterColumn<int>(
                name: "ChannelId",
                table: "Media",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateUploaded",
                table: "Media",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Channels_ChannelId",
                table: "Media",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "ChannelId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Media_Channels_ChannelId",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "DateUploaded",
                table: "Media");

            migrationBuilder.AlterColumn<int>(
                name: "ChannelId",
                table: "Media",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "FileCode",
                table: "Media",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Channels_ChannelId",
                table: "Media",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "ChannelId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
