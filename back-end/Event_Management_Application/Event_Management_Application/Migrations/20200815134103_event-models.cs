using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Event_Management_Application.Migrations
{
    public partial class eventmodels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "EventVideoTrailerFileId",
                table: "Events",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "EventCoverImageFileId",
                table: "Events",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "ChannelId",
                table: "Events",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ViewCount",
                table: "Events",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Channels",
                columns: table => new
                {
                    ChannelId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ChannelName = table.Column<string>(nullable: true),
                    ChannelImage = table.Column<byte[]>(nullable: true),
                    IsGlobal = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Channels", x => x.ChannelId);
                });

            migrationBuilder.CreateTable(
                name: "FlairTags",
                columns: table => new
                {
                    TagName = table.Column<string>(nullable: false),
                    UseCount = table.Column<int>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlairTags", x => x.TagName);
                });

            migrationBuilder.CreateTable(
                name: "Media",
                columns: table => new
                {
                    FileId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FileName = table.Column<string>(nullable: true),
                    FileContent = table.Column<byte[]>(nullable: true),
                    FileSize = table.Column<float>(nullable: false),
                    EventId = table.Column<int>(nullable: false),
                    ChannelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Media", x => x.FileId);
                    table.ForeignKey(
                        name: "FK_Media_Channels_ChannelId",
                        column: x => x.ChannelId,
                        principalTable: "Channels",
                        principalColumn: "ChannelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventFlairs",
                columns: table => new
                {
                    EventFlairId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EventId = table.Column<int>(nullable: false),
                    TagName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventFlairs", x => x.EventFlairId);
                    table.ForeignKey(
                        name: "FK_EventFlairs_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventFlairs_FlairTags_TagName",
                        column: x => x.TagName,
                        principalTable: "FlairTags",
                        principalColumn: "TagName",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_ChannelId",
                table: "Events",
                column: "ChannelId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_EventCoverImageFileId",
                table: "Events",
                column: "EventCoverImageFileId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_EventVideoTrailerFileId",
                table: "Events",
                column: "EventVideoTrailerFileId");

            migrationBuilder.CreateIndex(
                name: "IX_EventFlairs_EventId",
                table: "EventFlairs",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventFlairs_TagName",
                table: "EventFlairs",
                column: "TagName");

            migrationBuilder.CreateIndex(
                name: "IX_Media_ChannelId",
                table: "Media",
                column: "ChannelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Channels_ChannelId",
                table: "Events",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "ChannelId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Media_EventCoverImageFileId",
                table: "Events",
                column: "EventCoverImageFileId",
                principalTable: "Media",
                principalColumn: "FileId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Media_EventVideoTrailerFileId",
                table: "Events",
                column: "EventVideoTrailerFileId",
                principalTable: "Media",
                principalColumn: "FileId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Channels_ChannelId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_Media_EventCoverImageFileId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_Media_EventVideoTrailerFileId",
                table: "Events");

            migrationBuilder.DropTable(
                name: "EventFlairs");

            migrationBuilder.DropTable(
                name: "Media");

            migrationBuilder.DropTable(
                name: "FlairTags");

            migrationBuilder.DropTable(
                name: "Channels");

            migrationBuilder.DropIndex(
                name: "IX_Events_ChannelId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_EventCoverImageFileId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_EventVideoTrailerFileId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "ChannelId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "ViewCount",
                table: "Events");

            migrationBuilder.AlterColumn<int>(
                name: "EventVideoTrailerFileId",
                table: "Events",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EventCoverImageFileId",
                table: "Events",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
