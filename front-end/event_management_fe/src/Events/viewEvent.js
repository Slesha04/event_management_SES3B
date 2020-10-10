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
import Map from "./map/map";
import Snackbars from "../Shared/Snackbar";
import { getUserPlatformAPIPort} from "../Login/JwtConfig";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 100,
    marginBottom: 100,
    marginLeft: 300,
    marginRight: 300,
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
  },title: {
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

  // snackBar
  const [alertValue, setAlertValue] = React.useState("");
  const [DisplayValue, setDisplayValue] = React.useState("");

  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongtitude] = React.useState("");

  const [eventTitle, setEventTitle] = React.useState("");

  const [eventOrganiser, setEventOrganiser] = React.useState("");
  const [eventOrganiserID, setEventOrganiserID] = React.useState("");

  const [eventBodyText, setEventBodyText] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");

  const [eventType, setEventType] = React.useState(0);
  const [eventStatus, setEventStatus] = React.useState(0);

  const [ticketPrice, setTicketPrice] = React.useState(0);

  const [eventVisibility, setEventVisibility] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [AttendeeStatus, setAttendeeStatus] = React.useState("Join Event?");

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
  const handleEventOrganiserChange = (event) => {
    setEventOrganiser(event.target.value);
  };
  function getUserName(userId) {
    axios
      .get(`${getUserPlatformAPIPort()}api/UserController/GetUserById/${userId}`)
      .then(
        (res) => {
          if (res.status === 200) {
            console.log(res);
            setEventOrganiser(res.data.userName);
          }
        },
        (error) => {
          setDisplayValue(true);
          setAlertValue(0);
        }
      );
  }

  useEffect(() => {
    const userId = getUserID();

    axios
      .get(
        `${getUserPlatformAPIPort()}api/EventController/ViewEvent/${selectedEvent}`
      )
      .then(
        (res) => {
          if (res.status === 200) {
            console.log(res);
            setEventTitle(res.data.eventTitle);
            console.log(res.data.eventTitle);
            setEventBodyText(res.data.bodyText);
            setEventLocation(res.data.location.locationName);
            setEventDate(res.data.eventDate.slice(0, 10));
            setEventType(res.data.eventType);
            setTicketPrice(res.data.eventTicketPrice);
            setEventVisibility(res.data.eventVisibility);
            setEventOrganiser(getUserName(res.data.eventOrganiserId));
            setEventOrganiserID(res.data.eventOrganiserId);
          }
        },
        (error) => {
          setDisplayValue(true);
          setAlertValue(0);
        }
      );

    //map
    axios
      .get(
        `${getUserPlatformAPIPort()}api/EventController/GetEventCoordinates/${selectedEvent}`
      )
      .then(
        (res) => {
          if (res.status === 200) {
            setLatitude(res.data.latitude);
            setLongtitude(res.data.longitude);
          }
        },
        (error) => {
          setDisplayValue(true);
          setAlertValue(0);
        }
      );
  }, []);
  function addMarkers(map, links) {
    const marker = new window.google.maps.Marker({
      map,
      position: link.coords,
      label: `${0 + 1}`,
      title: link.title,
    });
    marker.addListener(`click`, () => {
      window.location.href = link.url;
    });
  }
  const link = {
    coords: { lat: latitude, lng: longitude }, // required: latitude & longitude at which to display the marker
    title: eventTitle, // optional
    url: `https://wikipedia.org/wiki/Life,_the_Universe_and_Everything`, // optional
  };

  let mapProps = {
    options: {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
    },
    onMount: addMarkers,
    onMountProps: link,
  };

  return (
    <div className={classes.paper}>
      <Snackbars
        title={"Backend Unrecheable"}
        alertValue={alertValue}
        DisplayValue={DisplayValue}
      />
      <Paper elevation={5}>
        <ViewEventCard
          eventId={selectedEvent}
          eventTitle={eventTitle}
          eventDate={eventDate}
          eventVenue={eventLocation}
          eventDescription={eventBodyText}
          eventOrgainser={eventOrganiser}
          eventPrice={ticketPrice}
          eventOrganiserId={eventOrganiserID}
          JoinOrLeave={props.location.state.AttendeeStatus}
        />  
        <Typography className={classes.title} component="div" variant={"h4"}>
        {" "}
        Google Map Location
      </Typography>
        <Map {...mapProps} />
      </Paper>
    </div>
  );
};

export default MyEvents;
