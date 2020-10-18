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
import AddAlertIcon from "@material-ui/icons/AddAlert";
import axios from "axios";
import {
  getHeaderToken,
  getToken,
  getUserID,
  getUserName,
} from "../../Login/JwtConfig";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbars from "../../Shared/Snackbar";
import { getUserPlatformAPIPort } from "../../Login/JwtConfig";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CheckIcon from "@material-ui/icons/Check";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import PersonIcon from "@material-ui/icons/Person";
import batman from "./avatar-viewEvent.png";
import Ratings from "../../Shared/Rating";
import Flairs from "../../Shared/Flairs";
import { useEffect } from "react";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import { IconButton } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Cookies from 'js-cookie'

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
  paper1: {
    display: "flex",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  paper: {
    display: "flex",

    margin: theme.spacing(1),
    width: theme.spacing(70),
    height: theme.spacing(90),
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

  const [JoinOrLeave, setJoinOrLeave] = React.useState(props.JoinOrLeave);

  const [inputCode, setInputCode] = React.useState(props.inputCode);

  const [arrivalStatus, setArrivalStatus] = React.useState(props.ArrivalStatus);

  let selectedCardId = localStorage.getItem("viewEventId");
  const [open, setOpen] = React.useState(false);
  const [checkInDialog, setCheckInDialog] = React.useState(false);
  const [count, setCount] = React.useState(
    localStorage.getItem(`eventLikes${cardId}`)
  );
  //on click open dialog for user arrivalto the event
  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };
  //on click open dialog for user joined the event
  const handleOpenCheckInDialog = (event) => {
    event.preventDefault();
    setCheckInDialog(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseCheckInEventDialog = () => {
    setCheckInDialog(false);
  };

  //likes

  const handleLikes = () => {
    let userLikeStatus = localStorage.getItem(
      `eventLikes${cardId}UserId${getUserID()}`
    );
    console.log(localStorage.getItem(`eventLikes${cardId}`));
    let numberOfLikes = Number(localStorage.getItem(`eventLikes${cardId}`));
    //check if the user has liked the event or not
    if (userLikeStatus == null || userLikeStatus == 0) {
      //if the user has not liked it already then like this event
      localStorage.setItem(`eventLikes${cardId}UserId${getUserID()}`, 1);
      numberOfLikes += 1;
      localStorage.setItem(`eventLikes${cardId}`, numberOfLikes);
      setCount(localStorage.getItem(`eventLikes${cardId}`));

      setAlertTitle("You liked this event!");
      setDisplayValue(true);
      setAlertValue(1);

      //if the user has already liked the event then do nothing
    } else if (userLikeStatus == 1) {
      localStorage.setItem(`eventLikes${cardId}UserId${getUserID()}`, 0);
      numberOfLikes -= 1;
      localStorage.setItem(`eventLikes${cardId}`, numberOfLikes);
      setCount(localStorage.getItem(`eventLikes${cardId}`));
      setAlertTitle("You removed your like! no-");
      setDisplayValue(true);
      setAlertValue(0);
    }

    console.log(count);
  };
  const handleCheckInEvent = () => {
    const body = {};
    console.log(getHeaderToken());
    console.log(props.inputCode);

    const res = axios
      .put(
        `${getUserPlatformAPIPort()}api/EventRosterController/MarkAttendeeSelf/${inputCode}/${selectedCardId}`,
        body,
        {
          headers: {
            Authorization: getHeaderToken(),
          },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) setArrivalStatus(true);

          Cookies.set(`user${getUserID()}event${selectedCardId}ArrivalStatus`, true);


          setAlertTitle("You're are checked in!");
          setDisplayValue(true);
          setAlertValue(1);
        },
        (error) => {
          setAlertTitle("Backend");
          setDisplayValue(true);
          setAlertValue(0);
          console.log(error);
        }
      );
    setCheckInDialog(false);
  };

  const joinEvent = (event) => {
    const body = {};
    console.log(props.eventOrganiserId);
    console.log(getUserID());
    console.log( cardId )

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
              console.log(res.status);
              //  alert that the user joined into the event
              setAlertTitle("You are added to the event!");
              // set the input code to the state
              setInputCode(res.data.inputCode);
              //set the arrivalStatus to the state
              setArrivalStatus(res.data.attendeeArrived);
              //set the cookie to usercode
              Cookies.set(`user${getUserID()}event${selectedCardId}`, res.data.inputCode);

              setDisplayValue(true);
              setAlertValue(1);
              setJoinOrLeave("Leave the event?");
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
            setArrivalStatus(false)
             //set the cookie to null
            Cookies.set(`user${getUserID()}event${selectedCardId}`,1);
            Cookies.set(`user${getUserID()}event${selectedCardId}ArrivalStatus`, 1);

            setDisplayValue(true);
            setAlertValue(1);
            setTimeout(() => {
              history.goBack();
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
                  image={localStorage.getItem(`imageIdEvent${selectedCardId}`)}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "5px",
                    width: "350px",
                    height: "350px",
                  }}
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
                      <Grid item xs={12}>
                        {/* people Going */}
                        <Paper elevation={7} className={classes.paper1}>
                          <Typography component="div" variant={"h5"}>
                            {" "}
                            People Interestred :
                            {localStorage.getItem(
                              `peopleGoing${selectedCardId}`
                            )}
                          </Typography>{" "}
                          <AvatarGroup max={2}>
                            {Array.from(Array(3), (e, i) => {
                              return <Avatar alt="Remy Sharp" src={batman} />;
                            })}
                          </AvatarGroup>
                        </Paper>{" "}
                      </Grid>
                      <Grid item xs={12}>
                        {/* event like */}
                        <IconButton
                          onClick={() => {
                            handleLikes();
                          }}
                        >
                          <Paper elevation={7} className={classes.paper1}>
                            <Typography component="div" variant={"h5"}>
                              {" "}
                              likes :
                              {/* {localStorage.getItem(
                              `peopleLike${selectedCardId}`
                            )} */}
                              <ThumbUpAltIcon fontSize="medium" /> {count}
                            </Typography>{" "}
                          </Paper>
                        </IconButton>
                      </Grid>

                      <Grid item xs={12}>
                        {/* event rating */}
                        <Paper elevation={7} className={classes.paper1}>
                          <Flairs
                            eventType={
                              props.eventType === 0
                                ? "Meet Up"
                                : props.eventType === 1
                                ? "Study"
                                : props.eventType === 2
                                ? "Party"
                                : "Special"
                            }
                            ticketTypes={
                              props.eventPrice === 0
                                ? "Free Event"
                                : "Ticketed Event"
                            }
                            eventVisibilityTypes={
                              props.eventVisibility === 0
                                ? "Public"
                                : "Unlisted"
                            }
                            UTSEvent={
                              props.eventVenue.includes("University")
                                ? "On-Campus event"
                                : props.eventVenue.includes("UTS")
                                ? "On-Campus event"
                                : "Off-Campus event"
                            }
                          />{" "}
                        </Paper>
                      </Grid>
                      <Typography variant="body2" component="p">
                        <br />
                      </Typography>
                    </Grid>
                    {getUserName() == props.eventOrgainser ? (
                      " "
                    ) : (
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        spacing={3}
                      >
                        <Grid item sm={6}>
                          <Paper elevation={7} className={classes.paper2}>
                            {JoinOrLeave == "Leave the event?" ? (
                              <ExitToAppIcon></ExitToAppIcon>
                            ) : (
                              <AddAlertIcon></AddAlertIcon>
                            )}{" "}
                            <Grid item xs={12}>
                              <Typography variant="h5" component="h2">
                              {arrivalStatus=== true ? "Leave this thread?" :
                                 JoinOrLeave}
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
                              <Grid item xs={12}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="medium"
                                >
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
                                    {JoinOrLeave == "Leave the event?"
                                      ? "You are going to leave this event. Are you sure?"
                                      : "You are going to join this event. Are you sure?"}
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    onClick={
                                      JoinOrLeave == "Leave the event?"
                                        ? leaveEvent
                                        : joinEvent
                                    }
                                    color="primary"
                                  >
                                    Ok
                                  </Button>
                                  <Button
                                    onClick={handleClose}
                                    color="primary"
                                    autoFocus
                                  >
                                    Cancel
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </CardActions>
                          </Paper>
                        </Grid>
                        {/* {eventAttended} */}
                        {JoinOrLeave == "Leave the event?" ? (
                          arrivalStatus == true ? (
                            <Grid item sm={6}>
                              <Paper elevation={7} className={classes.paper2}>
                                <CheckIcon></CheckIcon>
                                <Grid item xs={12}>
                                  <Typography variant="h5" component="h2">
                                    {"You went to this event!"}
                                  </Typography>
                                </Grid>
                              </Paper>
                            </Grid>
                          ) : (
                            <Grid item sm={6}>
                              <Paper elevation={7} className={classes.paper2}>
                                <CheckIcon></CheckIcon>
                                <Grid item xs={12}>
                                  <Typography variant="h5" component="h2">
                                    {arrivalStatus == false
                                      ? "Arrived at the Venue? check-in"
                                      : "You went to the event!"}
                                  </Typography>
                                </Grid>
                                {arrivalStatus == false ? (
                                  <CardActions>
                                    {/* button1 */}
                                    <Grid item xs={6}>
                                      <Button
                                        variant="contained"
                                        onClick={handleOpenCheckInDialog}
                                        color="primary"
                                        size="medium"
                                      >
                                        Yes
                                      </Button>
                                    </Grid>
                                    {/* button 2 */}
                                    <Grid item xs={12}>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                      >
                                        Cancel
                                      </Button>
                                    </Grid>
                                    <Dialog
                                      open={checkInDialog}
                                      onClose={handleCloseCheckInEventDialog}
                                      aria-labelledby="alert-dialog-title"
                                      aria-describedby="alert-dialog-description"
                                    >
                                      <DialogTitle id="alert-dialog-title">
                                        {"Confirmation"}
                                      </DialogTitle>
                                      <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                          You are going to check-in for this
                                          event. Are you sure?
                                        </DialogContentText>
                                      </DialogContent>
                                      <DialogActions>
                                        <Button
                                          onClick={handleCheckInEvent}
                                          color="primary"
                                        >
                                          Ok
                                        </Button>
                                        <Button
                                          onClick={
                                            handleCloseCheckInEventDialog
                                          }
                                          color="primary"
                                          autoFocus
                                        >
                                          Cancel
                                        </Button>
                                      </DialogActions>
                                    </Dialog>
                                  </CardActions>
                                ) : (
                                  " "
                                )}
                              </Paper>
                            </Grid>
                          )
                        ) : (
                          " "
                        )}
                      </Grid>
                    )}
                    {/* //register */}
                  </Grid>
                </Grid>
                {arrivalStatus == true ? (
                  <Grid item xs={12}>
                    {/* event rating */}
                    <Paper elevation={7} className={classes.paper1}>
                      <Ratings />{" "}
                    </Paper>
                  </Grid>
                ) : (
                  " "
                )}
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
              <Grid item xs={6} sm={6}>
                <Paper elevation={7} className={classes.paper}>
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
