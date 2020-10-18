import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
//import { tileData } from  '../Data/titleData';
import { borders } from "@material-ui/system";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { getHeaderToken, getToken, getUserID } from "../Login/JwtConfig";
import utsBackground from "./utsBackground.jpg";
import { useEffect, useState } from "react";
import upcomingEvent from "./Events.jpg";
import { useForm } from "react-hook-form";
import Snackbars from "../Shared/Snackbar";
import { getUserPlatformAPIPort } from "../Login/JwtConfig";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: theme.spacing(150),
    width: theme.spacing(300),
    backgroundImage: `url(${utsBackground})`,
  },
  formtwo: {
    margin: theme.spacing(5, 40, 40, 40),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    center: 0,
    width: theme.spacing(80),
    height: theme.spacing(120),
    justifyContent: "auto",
    overflow: "hidden",
    backgroundColor: "white",
  },

  form: {
    position: "absolute",
    right: 0,
    width: theme.spacing(65),
    height: theme.spacing(100),
    justifyContent: "auto",
    overflow: "hidden",
    backgroundColor: "grey",
  },
  noPadding: {
    padding: 0,
  },
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    height: theme.spacing(200),

    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  root_two: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 700,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const eventTypes = [
  {
    value: 0,
    label: "Meet Up",
  },
  {
    value: 1,
    label: "Study",
  },
  {
    value: 2,
    label: "Party",
  },
  {
    value: 3,
    label: "Special",
  },
];
const ticketTypes = [
  {
    value: 0,
    label: "Free Event",
  },
  {
    value: 1,
    label: "Ticketed Event",
  },
];
const eventVisibilityTypes = [
  {
    value: 0,
    label: "Public",
  },
  {
    value: 1,
    label: "Unlisted",
  },
];

const CreateEvent = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const [post, setPostArray] = useState([]);
  var x;
  // snackBar
  const [alertValue, setAlertValue] = React.useState("");
  const [alertTitle, setAlertTitle] = React.useState("");
  const [DisplayValue, setDisplayValue] = React.useState("");

  const [eventOrganiser, setEventOrganiser] = React.useState("");

  const [eventTitle, setEventTitle] = React.useState("");
  const [eventBodyText, setEventBodyText] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");

  const [eventDate, setEventDate] = React.useState("");

  const [eventType, setEventType] = React.useState(0);

  const [ticketPrice, setTicketPrice] = React.useState(0);

  const [eventVisibility, setEventVisibility] = React.useState(0);
  const history = useHistory();
  console.log(ProjectData[0].imageUrl);
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

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const handleEventVisibility = (event) => {
    setEventVisibility(event.target.value);
  };
  const imgData = (event) => {
    return ProjectData[Math.floor(Math.random() * ProjectData.length)].imageUrl;
  };
  const showEvent = (eventId, x) => {
    //store eveent id to local storage
    console.log("at the grid- " + eventId);
    localStorage.setItem("viewEventId", eventId);
    let AttendeeStatus = "";
    let ArrivalStatus = "";

    console.log(Cookies.get(`user${getUserID()}event${eventId}`));

    Cookies.get(`user${getUserID()}event${eventId}`) === undefined
      ? (AttendeeStatus = "Register for this event?")
      : parseInt(Cookies.get(`user${getUserID()}event${eventId}`)) === 1
      ? (AttendeeStatus = "Register for this event?")
      : (AttendeeStatus = "Leave the event?");

    Cookies.get(`user${getUserID()}event${eventId}ArrivalStatus`) === undefined
      ? (ArrivalStatus = false)
      : Cookies.get(`user${getUserID()}event${eventId}ArrivalStatus`) == 1
      ? (ArrivalStatus = false)
      : (ArrivalStatus = true);

    history.push({
      pathname: "/view-event",
      state: {
        AttendeeStatus: AttendeeStatus,
        inputCode: Cookies.get(`user${getUserID()}event${eventId}`),
        ArrivalStatus: ArrivalStatus,
      },
    });
  };

  useEffect(() => {
    const userId = getUserID();
    console.log("called");
    axios
      .get(`${getUserPlatformAPIPort()}api/EventController/LoadRecentEvents/1`)
      .then(
        (res) => {
          if (res.status === 200) {
            setPostArray(res.data);
            // console.log(res.data[0].eventTitle);
          }
        },
        (error) => {
          setAlertTitle("Backend Error!");
          setDisplayValue(true);
          setAlertValue(0);
        }
      );
  }, []);

  function getUserName(userId) {
    axios
      .get(
        `${getUserPlatformAPIPort()}api/UserController/GetUserById/${userId}`
      )
      .then(
        (res) => {
          if (res.status === 200) {
            console.log("this is" + res.data.userName);
            return res.data.userName;
          }
        },
        (error) => {
          setAlertTitle("Backend Error!");
          setDisplayValue(true);
          setAlertValue(0);
        }
      );
  }

  const handleRegister = (event) => {
    event.preventDefault();
    const body = {};
    console.log(
      `${getUserPlatformAPIPort()}api/EventController/CreateEvent/${eventTitle}/${eventBodyText}/${eventLocation}/${eventDate}/${ticketPrice}/${eventType}/${eventVisibility}`
    );
    console.log(getHeaderToken());
    if (
      eventTitle === "" ||
      eventBodyText === "" ||
      eventLocation === "" ||
      eventDate === ""
    ) {
      setAlertTitle("Please fill the required fields");
      setDisplayValue(true);
      setAlertValue(0);
      setTimeout(() => {
        setDisplayValue(false);
      }, 3500);
    } else {
      const res = axios
        .put(
          `${getUserPlatformAPIPort()}api/EventController/CreateEvent/${eventTitle}/${eventBodyText}/${eventLocation}/${eventDate}/${ticketPrice}/${eventType}/${eventVisibility}`,
          body,
          {
            headers: {
              Authorization: getHeaderToken(),
            },
          }
        )
        .then(
          (res) => {
            if (res.status === 200) {
              console.log(res);
              //andre has  to fix this backend error
              setAlertTitle("Create Event");
              setDisplayValue(true);
              setAlertValue(1);
            }
          },
          (error) => {
            console.log(error);
            setAlertTitle("Create Event");
            setDisplayValue(true);
            setAlertValue(1);
          }
        );
    }
  };

  return (
    <div className={classes.root}>
      <Snackbars
        title={alertTitle}
        alertValue={alertValue}
        DisplayValue={DisplayValue}
      />
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleRegister}
        className={classes.formtwo}
      >
        <Paper variant="outlined" elevation={6}>
          <h1> Create Event </h1>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Event Details
            </Typography>
            <Grid container spacing={3}>
              {/* event title */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required="true"
                  id="EventName"
                  name="Event Name"
                  label="Event Name"
                  value={eventTitle}
                  onChange={handleEventTitleChange}
                  variant="filled"
                  fullWidth
                  autoComplete="Event-Name"
                  type="text"
                  error={!!errors.text}
                  inputRef={register}
                />
              </Grid>
              {/* event Description */}
              <Grid item xs={12}>
                <TextField
                  required
                  id="Description1"
                  name="Description"
                  label="Description"
                  variant="filled"
                  value={eventBodyText}
                  onChange={handleEventBodyText}
                  fullWidth
                  autoComplete="Description"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="eventLocation"
                  name="Event Loocation"
                  label="Event Location"
                  variant="filled"
                  value={eventLocation}
                  onChange={handleEventLocationChange}
                  fullWidth
                  autoComplete="Event-Notes"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="date"
                  label="Event Date"
                  type="date"
                  defaultValue="2017-05-24"
                  value={eventDate}
                  onChange={handleEventDateChange}
                  variant="filled"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              {/* ticket price */}
              <Grid item xs={12}>
                <TextField
                  id="standard-select-currency-native"
                  select
                  label="Ticket Price"
                  value={ticketPrice}
                  variant="filled"
                  onChange={handleTicketPriceChange}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select it is a Ticketed or Free event"
                  fullWidth
                >
                  {ticketTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              {/* Event Type */}
              <Grid item xs={12}>
                <TextField
                  id="standard-select-currency-native"
                  select
                  label="Event type"
                  value={eventType}
                  variant="filled"
                  onChange={handleEventTypeChange}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select what type of Event is this"
                  fullWidth
                >
                  {eventTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              {/* Event Visibility */}
              <Grid item xs={12}>
                <TextField
                  id="standard-select-currency-native"
                  select
                  label="Event type"
                  value={eventVisibility}
                  variant="filled"
                  onChange={handleEventVisibility}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select what type of Event is this"
                  fullWidth
                >
                  {eventVisibilityTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="saveAddress"
                      value="yes"
                    />
                  }
                  label="I confirm the details above"
                />
              </Grid>
            </Grid>
          </React.Fragment>

          <Grid xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Create Event
            </Button>
          </Grid>
        </Paper>
      </form>

      <form noValidate autoComplete="off" className={classes.form}>
        <Paper elevation={14}>
          <h1>Current Events</h1>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="div">September</ListSubheader>
            </GridListTile>
            {post.map(
              (item) => (
                localStorage.getItem(`imageIdEvent${item.eventId}`) === null
                  ? ((x = imgData()),
                    localStorage.setItem(`imageIdEvent${item.eventId}`, x))
                  : (x = localStorage.getItem(`imageIdEvent${item.eventId}`)),
                (
                  <GridListTile
                    key={item}
                    onClick={() => showEvent(item.eventId, x)}
                  >
                    <img src={x} alt={item.eventTitle} />
                    <GridListTileBar
                      title={item.eventTitle}
                      subtitle={<span>about: {item.bodyText}</span>}
                      actionIcon={
                        <IconButton
                          aria-label={`info about ${item.title}`}
                          className={classes.icon}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                )
              )
            )}
          </GridList>
        </Paper>
      </form>
    
    </div>
  );
};
export default CreateEvent;
