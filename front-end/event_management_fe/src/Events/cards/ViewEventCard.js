import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import upcomingEvent from "../Events.jpg";
import { useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { getHeaderToken, getToken, getUserID } from "../../Login/JwtConfig";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbars from "../../Shared/Snackbar";
import { getUserPlatformAPIPort} from "../../Login/JwtConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 250,
    width: 200,
  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(80),
      height: theme.spacing(90),
    },
  },
  paper2: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(20),
      height: theme.spacing(5),
    },
  },
}));

export default function ViewEventCard(props) {
  const classes = useStyles();
  const cardId = props.eventId;
  const history = useHistory();
  // snackBar
  const [alertValue, setAlertValue] = React.useState("");
  const [DisplayValue, setDisplayValue] = React.useState("");
  const [alertTitle, setAlertTitle] = React.useState("");

  let selectedCardId = localStorage.getItem("viewEventId");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };
  // const handleEditEvent = (event) => {
  //   history.push("/edit-event");
  //   console.log(cardId);
  //   localStorage.setItem("selectedCard", cardId);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  const joinEvent = (event) => {
    const body = {};
    console.log(props.eventOrganiserId);
    console.log(getUserID());

    if (props.eventOrganiserId == getUserID()) {
      //open snackbar
      setAlertTitle("You cant join your own event!");
      setDisplayValue(true);
      setAlertValue(0);

      //close dialog
      setOpen(false);
    } else {
      const res = axios
        .post(
          `${getUserPlatformAPIPort()}api/EventRosterController/AddAttendee/${selectedCardId}`,
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
            if (res.status === 200) {
              setAlertTitle("You are added to the event!");
              setDisplayValue(true);
              setAlertValue(1);
            }
          },
          (error) => {
            console.log(error);
            //open snackbar
            setAlertTitle("You are already added to the event!");
            setDisplayValue(true);
            setAlertValue(0);
          }
        );
      setOpen(false);
    }
  };
  const leaveEvent = (event) => {
    const body = {};
    console.log(selectedCardId);

    const res = axios
      .delete(
        `${getUserPlatformAPIPort()}api/EventRosterController/RemoveAttendee/${selectedCardId}/${getUserID()}`,

        {
          headers: {
            Authorization: getHeaderToken(),
          },
        }
      )
      .then(
        (res) => {
          console.log(res);
          if (res.status === 200) {
            setAlertTitle("You left the event!");
            setDisplayValue(true);
            setAlertValue(1);
            setTimeout(() => {
              history.push("/MyEventRoster");
            }, 2500);
          }
        },
        (error) => {
          setAlertTitle("Backend Error!");
          setDisplayValue(true);
          setAlertValue(1);
        }
      );
    setOpen(false);
  };
  return (
    <Card className={classes.root}>
      <Snackbars
        title={alertTitle}
        alertValue={alertValue}
        DisplayValue={DisplayValue}
      />
      <CardContent>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          {/* card picture and title */}
          {/* Main Grid -1nd Item */}
          <Grid item xs={12} sm={6}>
            {/* container for card pciture */}
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="h3"
                  component="h2"
                  color="textPrimary"
                  Bold
                  gutterBottom
                >
                  Event: {props.eventTitle}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <CardMedia
                  component="img"
                  className={classes.media}
                  image={upcomingEvent}
                  title="Contemplative Reptile"
                />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    {" "}
                    <Typography variant="h4" component="h2">
                      Event Details
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="flex-start"
                    >
                      <Grid item xs={12}>
                        {" "}
                        <Typography variant="h4" color="Primary" component="h2">
                          Description: "{props.eventDescription}"
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h5" component="h2">
                          Date: {props.eventDate}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h5" component="h2">
                          Venue: {props.eventVenue}
                        </Typography>
                      </Grid>
                      {/* <Grid item xs={12}>
                        <Grid
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-start"
                        >
                          <Grid item xs={6} sm={3}>
                            <Typography variant="h5" component="h2">
                              Description{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="h5"
                              component="h2"
                              align="left"
                              paragraph="true"
                            >
                              {props.eventDescription}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid> */}

                      <Grid item xs={12}>
                        <Typography variant="h5" component="h2">
                          Orgainser : {props.eventOrgainser}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h5" component="h2">
                          Price:{" "}
                          {props.eventPrice == 0
                            ? "Free Event"
                            : "Ticketed Event"}
                        </Typography>
                      </Grid>
                      <Typography variant="body2" component="p">
                        <br />
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={6}>
                <Paper elevation={7} className={classes.paper2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                      {props.JoinOrLeave}
                    </Typography>
                  </Grid>
                  <CardActions>
                    {/* button1 */}
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        onClick={handleClickOpen}
                        color="primary"
                        size="medium"
                      >
                        Yes
                      </Button>
                    </Grid>
                    {/* button 2 */}
                    <Grid item xs={6}>
                      <Button variant="contained" color="primary" size="medium">
                        Cancel
                      </Button>
                    </Grid>
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
                          {props.JoinOrLeave == "Leave the event?"
                            ? "You are going to leave this event. Are you sure?"
                            : "You are going to join this event. Are you sure?"}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={
                            props.JoinOrLeave == "Leave the event?"
                              ? leaveEvent
                              : joinEvent
                          }
                          color="primary"
                        >
                          Ok
                        </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </CardActions>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Main Grid -2nd Item */}
          <Grid item xs={12} sm={6}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              {/* //grid item 1 */}
              <Grid item xs={6} sm={6}>
                <Typography variant={"h4"}> Event Chat</Typography>
              </Grid>
              {/* grid item 2 */}
              <Grid item xs={6} sm={6} className={classes.paper}>
                <Paper elevation={7}>
                  <Typography component="div" variant={"h5"}>
                    {" "}
                    event chat goes here
                  </Typography>
                </Paper>
              </Grid>
              {/* grid item 3 */}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
