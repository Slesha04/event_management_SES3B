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

export default function ViewEventCard(props) {
  const classes = useStyles();
  const cardId = props.eventId;
  const history = useHistory();
  let selectedCardId = localStorage.getItem("viewEventId");

  const handleEditEvent = (event) => {
    history.push("/edit-event");
    console.log(cardId);
    localStorage.setItem("selectedCard", cardId);
  };

  const joinEvent = (event) => {
    const body = {};
    console.log(selectedCardId)
    const res = axios
    .post(
      `https://localhost:5001/api/EventRosterController/AddAttendee/${selectedCardId}`,
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
        if (res.status === 200) alert("You are added to the event!");
      },
      (error) => {
        alert("You are already added to the event!", error);
      }
    );
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
                <Typography variant={"h4"}> Join The Event</Typography>
              </Grid>
              {/* grid item 2 */}
              <Grid container spacing={3} xs={6} sm={6}>
                <Grid item>
                  <Container maxWidth="sm">
                    <Typography
                      component="div"
                      style={{ backgroundColor: "#e0e0e0", height: "25vh" }}
                    >
                      {" "}
                      Event Description: {props.eventDescription}
                    </Typography>
                  </Container>
                </Grid>
              </Grid>
              {/* grid item 3 */}
              <Grid item sm={6}>
                <CardActions>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    {/* button1 */}
                    <Grid item xs={6} sm={6}>
                      <Button variant="contained" onClick={joinEvent} color="primary" size="medium">
                        Yes
                      </Button>
                    </Grid>
                    {" "}
                    {/* button 2 */}
                    <Grid item xs={6} sm={6}>
                      <Button variant="contained" color="primary" size="medium">
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
