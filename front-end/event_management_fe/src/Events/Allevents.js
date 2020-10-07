import React from "react";
import CardItem from "./cards/AllEventCard";
import "./cards/card.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
 import { useEffect, useState } from "react";
import { getHeaderToken, getToken, getUserID } from "../Login/JwtConfig";
import { getUserName } from "../Login/JwtConfig";

const AllEvents = () => {
  const [post, setPostArray] = useState([]);


  useEffect(() => {
    const userId = getUserID();
    console.log("called");
    axios
      .get(`https://localhost:5001/api/EventController/LoadMostPopularEvents/1`)

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
    </div>
  );
};

export default AllEvents;
