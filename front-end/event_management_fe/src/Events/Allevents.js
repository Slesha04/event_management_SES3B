import React from "react";
import CardItem from "./cards/AllEventCard";
import "./cards/card.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getHeaderToken, getToken, getUserID } from "../Login/JwtConfig";
import { getUserName } from "../Login/JwtConfig";
import Schedule   from "./Calendar/EventCalendar"
import { getUserPlatformAPIPort} from "../Login/JwtConfig";

const AllEvents = () => {
  const [post, setPostArray] = useState([]);

  useEffect(() => {
    const userId = getUserID();
    console.log("called");
    axios
      .get(`${getUserPlatformAPIPort()}api/EventController/LoadMostPopularEvents/1`)

      .then(
        (res) => {
          if (res.status === 200) {
            setPostArray(res.data);
            // console.log(res.data[0].eventTitle);
          }
        },
        (error) => {
          alert("something Went Wrong");
        }
      );
  }, []);
  const events = [
    {
      start: "2015-07-20",
      end: "2015-07-02",
      eventClasses: "optionalEvent",
      title: "test event",
      description: "This is a test description of an event",
    },
    {
      start: "2015-07-19",
      end: "2015-07-25",
      title: "test event",
      description: "This is a test description of an event",
      data: "you can add what ever random data you may want to use later",
    },
  ];
  return (
    <div className="card">
      <h1>Check out all most popular events happening on campus</h1>
      {post.map((item) => (
        <div key={item}>
          <div className="card__container">
            <div className="card__wrapper">
              <ul className="card__items">
                <CardItem
                  src="images/img-9.jpg"
                  text={item.eventTitle}
                  bodyText={item.bodyText}
                  label="Adventure"
                  evenetId={item.eventId}
                />
              </ul>
            </div>
          </div>
        </div>
      ))}
      <Schedule />
    </div>
  );
};

export default AllEvents;
