import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import upcomingEvent from "../Events.jpg";
import { useHistory } from "react-router-dom";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getHeaderToken, getToken, getUserID } from "../../Login/JwtConfig";
import Snackbars from "../../Shared/Snackbar";
import { getUserPlatformAPIPort } from "../../Login/JwtConfig";
import { IconButton } from "@material-ui/core";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import axios from "axios";
import ViewListIcon from "@material-ui/icons/ViewList";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from '@material-ui/icons/Visibility';
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(5),
    margin: theme.spacing(5),
    backgroundColor: "#EFEFEF",
  },
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",        

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
}));
const ProjectData = [
  { imageUrl: require("../dummyData/img1.jpg") },
  {
    imageUrl: require("../dummyData/img2.jpg"),
  },
  {
    imageUrl: require("../dummyData/img3.jpg"),
  },
  {
    imageUrl: require("../dummyData/img4.jpg"),
  },
  {
    imageUrl: require("../dummyData/img6.jpg"),
  },
  {
    imageUrl: require("../dummyData/img7.jpg"),
  },
  {
    imageUrl: require("../dummyData/img8.jpg"),
  },
  {
    imageUrl: require("../dummyData/img9.jpg"),
  },
  {
    imageUrl: require("../dummyData/img10.jpg"),
  },
  {
    imageUrl: require("../dummyData/img11.jpg"),
  },
];

export default function MyEventCard(props) {
  const [open, setOpen] = React.useState(false);
  var x;
  const imgData = (event) => {
    return ProjectData[Math.floor(Math.random() * ProjectData.length)].imageUrl;
  };
  const classes = useStyles();
  const cardId = props.eventId;
  const history = useHistory();
  // snackBar
  const [alertValue, setAlertValue] = React.useState("");
  const [DisplayValue, setDisplayValue] = React.useState("");
  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const showEvent = (eventId) => {
    //store eveent id to local storage
    console.log("at the grid- " + cardId);
    localStorage.setItem("viewEventId", cardId);
    history.push({
      pathname: "/view-event",
      state: { AttendeeStatus: "Check into this event?" },
    });   };
  const handleEditEvent = (event) => {
    history.push("/edit-event");
    console.log(cardId);
    localStorage.setItem("selectedCard", cardId);
  };
  const handleViewGuestList = (event) => {
    history.push("/guestList-event");
    console.log(cardId);
    localStorage.setItem("selectedCard", cardId);
  };
  const handleDeleteEvent = (event) => {
    axios
      .delete(
        `${getUserPlatformAPIPort()}api/EventController/DeleteEvent/${cardId}`,
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
            setDisplayValue(true);
            setAlertValue(1);
            setTimeout(() => {
              setDisplayValue(false);
            }, 2100);
          }
        },
        (error) => {
          setDisplayValue(true);
          setAlertValue(0);
        }
      );
    setOpen(false);
  };

  return (
      localStorage.getItem(`imageIdEvent${cardId}`) === null
                  ? ((x = imgData()),
                    localStorage.setItem(`imageIdEvent${cardId}`, x))
                  : (x = localStorage.getItem(`imageIdEvent${cardId}`)),
    <Card className={classes.root}>
      <Snackbars
        title={alertValue == 0 ? "Backend" : "Evented Deleted"}
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
          <Grid item xs={12} sm={6}>
            {/* container for card pciture */}
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <CardMedia
                  component="img"
                  className={classes.media}
                  image={x}
                 />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  color="textPrimary"
                  Bold
                  gutterBottom
                >
                  {props.eventTitle}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* card details */}
          <Grid item xs={12} sm={6}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
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
                    <Typography variant="h5" component="h2">
                      Date: {props.eventDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                      Venue: {props.eventVenue}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2" align="left">
                      Description: {props.eventDescription}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                      Orgainser : {props.eventOrgainser}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                      Price:{" "}
                      {props.eventPrice == 0 ? "Free Event" : "Ticketed Event"}
                    </Typography>
                  </Grid>
                  <Typography variant="body2" component="p">
                    <br />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {" "}
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={3} sm={3}>
            <IconButton
              classes={{ label: classes.iconButtonLabel }}
              onClick={handleEditEvent}color="primary" variant="raised"
            >
              <EditIcon style={{ fontSize: 20 }} />
              <Typography variant="h6" >Edit Event</Typography>
            </IconButton>
          </Grid>
          <Grid item xs={3} sm={3}>
            <IconButton
              classes={{ label: classes.iconButtonLabel }}
              onClick={handleViewGuestList}color="primary" variant="raised"
            >
              <ViewListIcon style={{ fontSize: 20 }} />
              <Typography variant="h6" >Guest View/list</Typography>
            </IconButton>
          </Grid>
          <Grid item xs={3} sm={3}>
            <IconButton
              classes={{ label: classes.iconButtonLabel }}
              onClick={handleClickOpen}color="primary" variant="raised"
            >
              <DeleteSweepIcon style={{ fontSize: 20 }} />
              <Typography variant="h6" >Delete Event</Typography>
            </IconButton>
          </Grid>
          <Grid item xs={3} sm={3}>
            <IconButton
              classes={{ label: classes.iconButtonLabel }}
              onClick={showEvent}color="primary" variant="raised"
            >
              <VisibilityIcon style={{ fontSize: 20 }} />
              <Typography variant="h6" >View Event</Typography>
            </IconButton>
          </Grid>
        </Grid>
      
         <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are going to delete this event. Are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteEvent} color="primary">
              Ok
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        
      </CardActions>
    </Card>
  );
}
