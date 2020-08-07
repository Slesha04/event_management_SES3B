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

            modelBuilder.Entity("Event_Management_Application.Models.Event", b =>
                {
                    b.Property<int>("EventId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BodyText");

                    b.Property<int>("EventCoverImageFileId");

                    b.Property<DateTime>("EventCreationDate");

                    b.Property<DateTime>("EventDate");

                    b.Property<DateTime>("EventLastModifiedDate");

                    b.Property<int>("EventOrganiserId");

                    b.Property<int>("EventStatus");

                    b.Property<float>("EventTicketPrice");

                    b.Property<string>("EventTitle");

                    b.Property<int>("EventType");

                    b.Property<int>("EventVideoTrailerFileId");

                    b.Property<int>("EventVisibility");

                    b.HasKey("EventId");

                    b.HasIndex("EventOrganiserId");

                    b.ToTable("Events");
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
                    b.Property<Guid>("TokenId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("TokenIssueDate");

                    b.Property<int>("UserId");

                    b.HasKey("TokenId");

                    b.HasIndex("UserId");

                    b.ToTable("UserTokenEntries");
                });

            modelBuilder.Entity("Event_Management_Application.Models.Event", b =>
                {
                    b.HasOne("Event_Management_Application.Models.User", "EventOrganiser")
                        .WithMany()
                        .HasForeignKey("EventOrganiserId")
                        .OnDelete(DeleteBehavior.Cascade);

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

                            b1.HasKey("EventId");

                            b1.ToTable("Events");

                            b1.HasOne("Event_Management_Application.Models.Event")
                                .WithOne("Location")
                                .HasForeignKey("Event_Management_Application.Models.FormalAddress", "EventId")
                                .OnDelete(DeleteBehavior.Cascade);
                        });
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
