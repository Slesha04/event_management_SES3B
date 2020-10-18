import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";

import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getHeaderToken, getToken, getUserID } from "../../Login/JwtConfig";
import { getUserPlatformAPIPort } from "../../Login/JwtConfig";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 100,
    marginBottom: 100,
    marginLeft: 100,
    marginRight: 100,
    flexDirection: "column",
    alignItems: "center",
  },
  outsidePaper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    marginLeft: theme.spacing(30),
    marginRight: theme.spacing(30),
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Cavents = (props) => {
  const classes = useStyles();
  let selectedEvent = localStorage.getItem("viewEventId");

  const [post, setPostArray] = useState([]);

  const history = useHistory();
  let selectedCardId = localStorage.getItem("selectedCard");

  // snackBar
  const [alertValue, setAlertValue] = React.useState("");
  const [DisplayValue, setDisplayValue] = React.useState("");

  const handleEventClick = ({ event }) => {
    //store eveent id to local storage
    console.log("at the grid- " + event.id);
    localStorage.setItem("viewEventId", event.id);
    let AttendeeStatus = "";
    let ArrivalStatus = "";

    console.log(Cookies.get(`user${getUserID()}event${event.id}`));

    Cookies.get(`user${getUserID()}event${event.id}`) === undefined
      ? (AttendeeStatus = "Register for this event?")
      : parseInt(Cookies.get(`user${getUserID()}event${event.id}`)) === 1
      ? (AttendeeStatus = "Register for this event?")
      : (AttendeeStatus = "Leave the event?");

    Cookies.get(`user${getUserID()}event${event.id}ArrivalStatus`) === undefined
      ? (ArrivalStatus = false)
      : Cookies.get(`user${getUserID()}event${event.id}ArrivalStatus`) == 1
      ? (ArrivalStatus = false)
      : (ArrivalStatus = true);

    history.push({
      pathname: "/view-event",
      state: {
        AttendeeStatus: "Leave the event?",
        inputCode: Cookies.get(`user${getUserID()}event${event.id}`),
        ArrivalStatus: ArrivalStatus,
      },
    });
  };

  useEffect(() => {
    const userId = getUserID();
    let apiData = [];
    axios
      .get(
        `${getUserPlatformAPIPort()}api/EventRosterController/GetRosterEntriesByUser`,
        {
          headers: {
            Authorization: getHeaderToken(),
          },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            res.data.map((item) => {
              var myObject = {};
              // console.log(item.eventTitle);
              myObject["title"] = item.eventTitle;
              //console.log(item.eventDate.slice(0, 10));
              myObject["start"] = item.rosterEntry.dateRegistered.slice(0, 10);
              myObject["id"] = item.rosterEntry.eventId;
              apiData.push(myObject);
            });
            setPostArray(apiData);
          }
        },
        (error) => {
          alert("something Went Wrong");
        }
      );
  },[]);

  return (
    console.log(post),

    <Paper
      style={{
        marginTop: 100,
        marginBottom: 100,
        marginLeft: 300,
        marginRight: 300,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {" "}
      <Typography variant="h3">Event Calendar</Typography>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={post}
        eventClick={handleEventClick}
        lazyFetching={true} 

      />
    </Paper>
  );
};

export default Cavents;
