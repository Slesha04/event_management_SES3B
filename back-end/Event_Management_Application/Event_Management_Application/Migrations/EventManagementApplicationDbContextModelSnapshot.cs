﻿// <auto-generated />
using System;
using Event_Management_Application.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Event_Management_Application.Migrations
{
    [DbContext(typeof(EventManagementApplicationDbContext))]
    partial class EventManagementApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Event_Management_Application.Models.Channel", b =>
                {
                    b.Property<int>("ChannelId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<Guid>("ChannelCode");

                    b.Property<byte[]>("ChannelImage");

                    b.Property<string>("ChannelName");

                    b.Property<int>("CurrentSequenceNumber");

                    b.Property<bool>("IsGlobal");

                    b.HasKey("ChannelId");

                    b.ToTable("Channels");
                });

            modelBuilder.Entity("Event_Management_Application.Models.Event", b =>
                {
                    b.Property<int>("EventId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BodyText");

                    b.Property<Guid>("ChannelCode");

                    b.Property<int>("ChannelId");

                    b.Property<int?>("EventCoverImageFileId");

                    b.Property<DateTime>("EventCreationDate");

                    b.Property<DateTime>("EventDate");

                    b.Property<DateTime>("EventLastModifiedDate");

                    b.Property<int>("EventOrganiserId");

                    b.Property<int>("EventStatus");

                    b.Property<float>("EventTicketPrice");

                    b.Property<string>("EventTitle");

                    b.Property<int>("EventType");

                    b.Property<int?>("EventVideoTrailerFileId");

                    b.Property<int>("EventVisibility");

                    b.Property<int>("ViewCount");

                    b.HasKey("EventId");

                    b.HasIndex("ChannelId");

                    b.HasIndex("EventCoverImageFileId");

                    b.HasIndex("EventOrganiserId");

                    b.HasIndex("EventVideoTrailerFileId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("Event_Management_Application.Models.EventFlair", b =>
                {
                    b.Property<int>("EventFlairId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("EventId");

                    b.Property<string>("TagName");

                    b.HasKey("EventFlairId");

                    b.HasIndex("EventId");

                    b.HasIndex("TagName");

                    b.ToTable("EventFlairs");
                });

            modelBuilder.Entity("Event_Management_Application.Models.EventRosterEntry", b =>
                {
                    b.Property<int>("RosterEntryId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("AttendeeArrived");

                    b.Property<int>("AttendeeId");

                    b.Property<string>("AttendeeUsername");

                    b.Property<DateTime>("DateRegistered");

                    b.Property<int>("EventId");

                    b.Property<string>("InputCode");

                    b.HasKey("RosterEntryId");

                    b.ToTable("EventRosterEntries");
                });

            modelBuilder.Entity("Event_Management_Application.Models.FlairTag", b =>
                {
                    b.Property<string>("TagName")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<int>("UseCount");

                    b.HasKey("TagName");

                    b.ToTable("FlairTags");
                });

            modelBuilder.Entity("Event_Management_Application.Models.Medium", b =>
                {
                    b.Property<int>("FileId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ChannelId");

                    b.Property<DateTime>("DateUploaded");

                    b.Property<int>("EventId");

                    b.Property<byte[]>("FileContent");

                    b.Property<string>("FileName");

                    b.Property<float>("FileSize");

                    b.Property<int>("UploaderId");

                    b.HasKey("FileId");

                    b.HasIndex("ChannelId");

                    b.ToTable("Media");
                });

            modelBuilder.Entity("Event_Management_Application.Models.Message", b =>
                {
                    b.Property<int>("MessageId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AuthorId");

                    b.Property<string>("AuthorUsername");

                    b.Property<int>("ChannelId");

                    b.Property<DateTime>("DatePosted");

                    b.Property<string>("MessageText");

                    b.Property<int>("SequenceNumber");

                    b.HasKey("MessageId");

                    b.HasIndex("ChannelId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("Event_Management_Application.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<byte[]>("ProfilePicture");

                    b.Property<string>("UserDesc");

                    b.Property<DateTime>("UserDob");

                    b.Property<string>("UserEmail");

                    b.Property<int>("UserGender");

                    b.Property<string>("UserLandline");

                    b.Property<string>("UserMobile");

                    b.Property<string>("UserName")
                        .IsRequired();

                    b.Property<string>("UserPassword");

                    b.Property<bool>("UserVerified");

                    b.HasKey("UserId");

                    b.HasAlternateKey("UserName");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Event_Management_Application.Models.UserTokenEntry", b =>
                {
                    b.Property<string>("TokenId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("TokenExpiryDate");

                    b.Property<DateTime>("TokenIssueDate");

                    b.Property<int>("UserId");

                    b.HasKey("TokenId");

                    b.HasIndex("UserId");

                    b.ToTable("UserTokenEntries");
                });

            modelBuilder.Entity("Event_Management_Application.Models.Event", b =>
                {
                    b.HasOne("Event_Management_Application.Models.Channel", "Channel")
                        .WithMany()
                        .HasForeignKey("ChannelId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Event_Management_Application.Models.Medium", "EventCoverImageFile")
                        .WithMany()
                        .HasForeignKey("EventCoverImageFileId");

                    b.HasOne("Event_Management_Application.Models.User", "EventOrganiser")
                        .WithMany()
                        .HasForeignKey("EventOrganiserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Event_Management_Application.Models.Medium", "EventVideoTrailerFile")
                        .WithMany()
                        .HasForeignKey("EventVideoTrailerFileId");

                    b.OwnsOne("Event_Management_Application.Models.FormalAddress", "Location", b1 =>
                        {
                            b1.Property<int>("EventId")
                                .ValueGeneratedOnAdd()
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<string>("AddressApartmentNumber");

                            b1.Property<string>("AddressBuildingNumber");

                            b1.Property<string>("AddressCityName");

                            b1.Property<string>("AddressCountryName");

                            b1.Property<string>("AddressPostcode");

                            b1.Property<string>("AddressStateName");

                            b1.Property<string>("AddressStreetName");

                            b1.Property<string>("AddressSuburbName");

                            b1.Property<string>("FullAddress");

                            b1.Property<string>("LevelNumber");

                            b1.Property<string>("LocationName");

                            b1.Property<string>("SuiteNumber");

                            b1.HasKey("EventId");

                            b1.ToTable("Events");

                            b1.HasOne("Event_Management_Application.Models.Event")
                                .WithOne("Location")
                                .HasForeignKey("Event_Management_Application.Models.FormalAddress", "EventId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });
                });

            modelBuilder.Entity("Event_Management_Application.Models.EventFlair", b =>
                {
                    b.HasOne("Event_Management_Application.Models.Event", "Event")
                        .WithMany("EventFlairs")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Event_Management_Application.Models.FlairTag", "FlairTag")
                        .WithMany("EventFlairs")
                        .HasForeignKey("TagName");
                });

            modelBuilder.Entity("Event_Management_Application.Models.Medium", b =>
                {
                    b.HasOne("Event_Management_Application.Models.Channel", "Channel")
                        .WithMany("Media")
                        .HasForeignKey("ChannelId");
                });

            modelBuilder.Entity("Event_Management_Application.Models.Message", b =>
                {
                    b.HasOne("Event_Management_Application.Models.Channel", "Channel")
                        .WithMany()
                        .HasForeignKey("ChannelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Event_Management_Application.Models.UserTokenEntry", b =>
                {
                    b.HasOne("Event_Management_Application.Models.User", "User")
                        .WithMany("UserTokenEntries")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
