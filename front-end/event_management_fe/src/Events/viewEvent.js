import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useEffect, useState } from "react";
import { getHeaderToken, getToken, getUserID } from "../Login/JwtConfig";
import ViewEventCard from "./cards/ViewEventCard";
import { getUserName } from "../Login/JwtConfig";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),

    display: "flex",
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const MyEvents = (props) => {
  const classes = useStyles();
  let selectedEvent = localStorage.getItem("viewEventId");

  const [post, setPostArray] = useState([]);

  const history = useHistory();
  let selectedCardId = localStorage.getItem("selectedCard");

  const [eventTitle, setEventTitle] = React.useState("");
  const [eventBodyText, setEventBodyText] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");

  const [eventType, setEventType] = React.useState(0);
  const [eventStatus, setEventStatus] = React.useState(0);

  const [ticketPrice, setTicketPrice] = React.useState(0);

  const [eventVisibility, setEventVisibility] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    event.preventDefault();

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEventTitleChange = (event) => {
    setEventTitle(event.target.value);
  };

  const handleEventBodyText = (event) => {
    setEventBodyText(event.target.value);
  };

  const handleEventLocationChange = (event) => {
    setEventLocation(event.target.value);
  };

  const handleEventDateChange = (event) => {
    setEventDate(event.target.value);
  };

  const handleTicketPriceChange = (event) => {
    setTicketPrice(event.target.value);
  };
  const handleEventStatusChange = (event) => {
    setEventStatus(event.target.value);
  };

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const handleEventVisibility = (event) => {
    setEventVisibility(event.target.value);
  };

  useEffect(() => {
    const userId = getUserID();

    axios
      .get(
        `https://localhost:5001/api/EventController/ViewEvent/${selectedEvent}`
      )

      .then(
        (res) => {
          if (res.status === 200) {
            // console.log(res)
            setEventTitle(res.data.eventTitle);
            console.log(res.data.eventTitle);
            setEventBodyText(res.data.bodyText);
            setEventLocation(res.data.location.locationName);
            setEventDate(res.data.eventDate.slice(0, 10));
            setEventType(res.data.eventType);
            setTicketPrice(res.data.eventTicketPrice);
            setEventVisibility(res.data.eventVisibility);
          }
        },
        (error) => {
          alert("something Went Wrong");
        }
      );
  }, []);
  return (
    <div>
      <Paper elevation={5}>
        <ViewEventCard
          eventId={selectedEvent}
          eventTitle={eventTitle}
          eventDate={eventDate}
          eventVenue={eventLocation}
          eventDescription={eventBodyText}
          eventOrgainser={getUserName()}
          eventPrice={ticketPrice}
        />
      </Paper>
    </div>
  );
};

export default MyEvents;