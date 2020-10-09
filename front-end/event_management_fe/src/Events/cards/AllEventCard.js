import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getUserPlatformAPIPort} from "../../Login/JwtConfig";

function AllEventCard(props) {
  const history = useHistory();

  const showEvent = (eventId) => {
    //store eveent id to local storage
    console.log("at the grid- " + eventId);
    localStorage.setItem("viewEventId", eventId);
    
   };

  return (
    <>
      <li className="cards__item">
        <Link
          className="cards__item__link"
          to={{pathname: "/view-event",state: { AttendeeStatus: "Check into this event?" }}}
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
            <h5 className="cards__item__text">{props.text}</h5>
            <h5 className="cards__item__text">{props.bodyText}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default AllEventCard;
