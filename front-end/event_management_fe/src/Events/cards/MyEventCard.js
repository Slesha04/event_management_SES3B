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

import axios from "axios";

const useStyles = makeStyles({
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
});

export default function MyEventCard(props) {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const cardId = props.eventId;
  const history = useHistory();

  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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
    const body = {};

    axios
    .delete(
      `https://localhost:5001/api/EventController/DeleteEvent/${cardId}`,  {
        headers: {
          'Authorization':  getHeaderToken()
        },body}
    )

    .then(
      (res) => {
        console.log(res)
        if (res.status === 200) {
          alert("event deleted");
        }
      },
      (error) => {
        alert("something Went Wrong");
      }
    );
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
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
                  image={upcomingEvent}
                  title="Contemplative Reptile"
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
                      eventDate: {props.eventDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                      eventVenue: {props.eventVenue}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                      eventDescription: {props.eventDescription}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                      eventOrgainser : {props.eventOrgainser}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                      eventPrice: {props.eventPrice}
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
        <Button color="primary" size="medium" onClick={handleEditEvent}>
          {" "}
          Edit
        </Button>
        <Button color="primary" size="medium" onClick={handleViewGuestList}>
          {" "}
          Guest View/list
        </Button>
        <Button color="primary" size="medium" onClick={handleClickOpen}>
          {" "}
          Delete Event

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
