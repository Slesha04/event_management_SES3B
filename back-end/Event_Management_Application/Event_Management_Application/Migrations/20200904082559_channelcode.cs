using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Event_Management_Application.Migrations
{
    public partial class channelcode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ChannelCode",
                table: "Events",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ChannelCode",
                table: "Channels",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChannelCode",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "ChannelCode",
                table: "Channels");
        }
    }
}
