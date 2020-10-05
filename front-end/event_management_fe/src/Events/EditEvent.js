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
import { borders } from "@material-ui/system";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { getHeaderToken, getToken, getUserID } from "../Login/JwtConfig";
import { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  fade,
  ThemeProvider,
  withStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: theme.spacing(150),
    width: theme.spacing(300),
  },
  textFieldInput: {},
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
const eventStatusTypes = [
  {
    value: 0,
    label: "Active",
  },
  {
    value: 1,
    label: "Cancelled",
  },
  {
    value: 2,
    label: "Postponed",
  },
  {
    value: 3,
    label: "Postponed_Date_TBA ",
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

const EditEvent = (props) => {
  const classes = useStyles();
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
        `https://localhost:5001/api/EventController/ViewEvent/${selectedCardId}`
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

  const handleUpdate = (event) => {
    event.preventDefault();
    const body = {};
    console.log(
      `http://localhost:5000/api/EventController/UpdateEvent/${selectedCardId}/${eventTitle}/${eventBodyText}/${eventLocation}/${eventDate}/${eventStatus}/${ticketPrice}/${eventType}/${eventVisibility}`
    );
    console.log(getHeaderToken());
    const res = axios
      .put(
        `https://localhost:5001/api/EventController/UpdateEvent/${selectedCardId}/${eventTitle}/${eventBodyText}/${eventLocation}/${eventDate}/${eventStatus}/${ticketPrice}/${eventType}/${eventVisibility}`,
        body,
        {
          headers: {
            Authorization: getHeaderToken(),
          },
        }
      )
      .then(
        (res) => {
          console.log(res);
          if (res.status === 200) alert("update Event Success");
        },
        (error) => {
          alert("something went wrong,  please try again", error);
        }
      );
      setOpen(false);
  };

  return (
    <div className={classes.root}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleClickOpen}
        className={classes.formtwo}
      >
        <ThemeProvider theme={theme}>
          <Paper variant="outlined" elevation={6}>
            <h1> Edit Event </h1>
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Event Details
              </Typography>
              <Grid container spacing={3}>
                {/* event title */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="EventName"
                    name="Event Name"
                    label="Event Name"
                    value={eventTitle}
                    onChange={handleEventTitleChange}
                    variant="filled"
                    fullWidth
                    InputProps={{
                      className: classes.textFieldInput,
                    }}
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
                    id="date"
                    label="Event Date"
                    type="date"
                    value={eventDate}
                    onChange={handleEventDateChange}
                    variant="filled"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                {/* event Status  */}
                <Grid item xs={12}>
                  <TextField
                    id="standard-select-currency-native"
                    select
                    label="Event Status"
                    value={eventStatus}
                    variant="filled"
                    onChange={handleEventStatusChange}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Please select the status for this Event"
                    fullWidth
                  >
                    {eventStatusTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
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
                onClick={handleClickOpen}
              >
                Update Event
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Confirmation"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    You are going to update the details for this event. Are you sure?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleUpdate} color="primary">
                    Ok
                  </Button>
                  <Button onClick={handleClose} color="primary" autoFocus>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Paper>
        </ThemeProvider>
      </form>
    </div>
  );
};
export default EditEvent;
