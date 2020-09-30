import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import upcomingEvent from "./Events.jpg";

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

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

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
        <Button color="primary" size="medium"> Edit</Button>
        <Button color="primary" size="medium"> Guest View/list</Button>
      </CardActions>
    </Card>
  );
}
