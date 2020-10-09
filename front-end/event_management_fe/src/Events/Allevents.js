import React from "react";
import CardItem from "./cards/AllEventCard";
import "./cards/card.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getHeaderToken, getToken, getUserID } from "../Login/JwtConfig";
import { getUserName } from "../Login/JwtConfig";
import { getUserPlatformAPIPort } from "../Login/JwtConfig";
import SearchBar from "material-ui-search-bar";

const ProjectData = [
  { imageUrl: require("./dummyData/img1.jpg") },
  {
    imageUrl: require("./dummyData/img2.jpg"),
  },
  {
    imageUrl: require("./dummyData/img3.jpg"),
  },
  {
    imageUrl: require("./dummyData/img4.jpg"),
  },
  {
    imageUrl: require("./dummyData/img6.jpg"),
  },
  {
    imageUrl: require("./dummyData/img7.jpg"),
  },
  {
    imageUrl: require("./dummyData/img8.jpg"),
  },
  {
    imageUrl: require("./dummyData/img9.jpg"),
  },
  {
    imageUrl: require("./dummyData/img10.jpg"),
  },
  {
    imageUrl: require("./dummyData/img11.jpg"),
  },
];

const AllEvents = () => {
  const [post, setPostArray] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  var x;

  const handleSearchItem = (event) => {
    setSearchItem(event.target.value);
  };

  const handleRequest = (event) => {
    console.log(searchItem);
    axios
      .get(
        `${getUserPlatformAPIPort()}api/EventController/SearchEventsByName/${searchItem}/1`
      )
      .then(
        (res) => {
          if (res.status === 200) {
            // 1. Make a shallow copy of the items
            let arr = post;
            // 2. Make a shallow copy of the item you want to mutate
            console.log(res.data);

            let item = res.data;
            // 3. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
            arr[1] = item;
            // 4. Set the state to our new copy
            setPostArray(arr);
            console.log(post);
            // console.log(res.data[0].eventTitle);
          }
        },
        (error) => {
          alert("something Went Wrong");
          console.log(error);
        }
      );
  };

  useEffect(() => {
    const userId = getUserID();
    console.log("called");
    axios
      .get(
        `${getUserPlatformAPIPort()}api/EventController/LoadMostPopularEvents/1`
      )
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
  const imgData = (event) => {
    return ProjectData[Math.floor(Math.random() * ProjectData.length)].imageUrl;
  };

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

      <SearchBar
        value={searchItem}
        onChange={(searchItem) => setSearchItem(searchItem)}
        onRequestSearch={() => handleRequest(searchItem)}
      />

      {post.map(
        (item) => (
          (x = imgData()),
          localStorage.setItem(`imageIdEvent${item.eventId}`, x),
          (
            <div key={item}>
              <div className="card__container">
                <div className="card__wrapper">
                  <ul className="card__items">
                    <CardItem
                      src={x}
                      text={item.eventTitle}
                      bodyText={item.bodyText}
                      label="Adventure"
                      evenetId={item.eventId}
                    />
                  </ul>
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default AllEvents;
