import { setElSeg } from "@fullcalendar/core";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getUserPlatformAPIPort } from "../../Login/JwtConfig";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getHeaderToken, getToken, getUserID } from "../../Login/JwtConfig";
function AllEventCard(props) {
  const history = useHistory();
  const [AttendeeStatus, setAttendeeStatus] = React.useState("");
  const [ArrivalStatus, setArrivalStatus] = React.useState("");

  const showEvent = (eventId) => {
    //store eveent id to local storage
    console.log("at the grid- " + eventId);
    localStorage.setItem("viewEventId", eventId);

    console.log(Cookies.get(`user${getUserID()}event${eventId}`));
  };
  useEffect(() => {
    let AttendeeStatus = "";
    Cookies.get(`user${getUserID()}event${props.evenetId}`) === undefined
      ? (AttendeeStatus = "Register for this event?")
      : parseInt(Cookies.get(`user${getUserID()}event${props.evenetId}`)) === 1
      ? (AttendeeStatus = "Register for this event?")
      : (AttendeeStatus = "Leave the event?");
    setAttendeeStatus(AttendeeStatus);

    Cookies.get(`user${getUserID()}event${props.evenetId}ArrivalStatus`) ===
    undefined
      ? setArrivalStatus(false)
      : Cookies.get(`user${getUserID()}event${props.evenetId}ArrivalStatus`) ==
        1
      ? setArrivalStatus(false)
      : setArrivalStatus(true);
  });

  return (
    <>
      <li className="cards__item">
        <Link
          className="cards__item__link"
          to={{
            pathname: "/view-event",
            state: {
              AttendeeStatus: AttendeeStatus,
              inputCode: Cookies.get(
                `user${getUserID()}event${props.evenetId}`
              ),
              ArrivalStatus: ArrivalStatus,
            },
          }}
          onClick={() => showEvent(props.evenetId)}
        >
          <figure className="cards__item__pic-wrap" data-category={props.label}>
            <img
              src={props.src}
              alt="Travel Image"
              className="cards__item__img"
            />
          </figure>
          <div className="cards__item__info">
            <h5 className="cards__item__text">Event : {props.text}</h5>
            <h5 className="cards__item__text">
              Description : {props.bodyText}
            </h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default AllEventCard;
