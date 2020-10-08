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
import {useForm} from "react-hook-form";

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

  const [eventOrganiser, setEventOrganiser] = React.useState("");

  const [eventTitle, setEventTitle] = React.useState("");
  const [eventBodyText, setEventBodyText] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");

  const [eventDate, setEventDate] = React.useState("");

  const [eventType, setEventType] = React.useState(0);

  const [ticketPrice, setTicketPrice] = React.useState(0);

  const [eventVisibility, setEventVisibility] = React.useState(0);
  const history = useHistory();

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

  const showEvent = (eventId) => {
    //store eveent id to local storage
    console.log("at the grid- " + eventId);
    localStorage.setItem("viewEventId", eventId);
    history.push({
      pathname: "/view-event",
      state: { AttendeeStatus: "Check into this event?" },
    });
  };

  useEffect(() => {
    const userId = getUserID();
    console.log("called");
    axios
      .get(`https://localhost:5001/api/EventController/LoadRecentEvents/1`)
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

  function getUserName(userId) {
    axios
      .get(`https://localhost:5001/api/UserController/GetUserById/${userId}`)
      .then(
        (res) => {
          if (res.status === 200) {
            console.log("this is" + res.data.userName);
            return res.data.userName;
          }
        },
        (error) => {}
      );
  }

  const handleRegister = (event) => {
    event.preventDefault();
    const body = {};
    console.log(
      `https://localhost:5001/api/EventController/CreateEvent/${eventTitle}/${eventBodyText}/${eventLocation}/${eventDate}/${ticketPrice}/${eventType}/${eventVisibility}`
    );
    console.log(getHeaderToken());
    if(eventTitle === "" || eventBodyText === "" || eventLocation === "" || eventDate === ""){
      alert("Please fill the required fields ");

    }else{
      const res = axios
      .put(
        `https://localhost:5001/api/EventController/CreateEvent/${eventTitle}/${eventBodyText}/${eventLocation}/${eventDate}/${ticketPrice}/${eventType}/${eventVisibility}`,
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
            console.log(res)
            alert("Create Event Success");
          }
        },
        (error) => {
          console.log(error)
          alert("Create Event Success", error);
        }
      );
    }
    
  };

  return (
    <div className={classes.root}>
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
            {post.map((item) => (
              <GridListTile key={item} onClick={() => showEvent(item.eventId)}>
                <img src={upcomingEvent} alt={item.eventTitle} />
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
            ))}
          </GridList>
        </Paper>
      </form>
    </div>
  );
};
export default CreateEvent;
