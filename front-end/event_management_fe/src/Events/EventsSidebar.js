import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { getHeaderToken, getToken, getUserID } from "../Login/JwtConfig";
import { getUserPlatformAPIPort } from "../Login/JwtConfig";
import Snackbars from "../Shared/Snackbar";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
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
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      height: theme.spacing(150),
      width: theme.spacing(300),
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
        margin: theme.spacing(5, 40, 40, 40),
       
        width: theme.spacing(60),
        height: theme.spacing(120),
        justifyContent: "auto",
        overflow: "hidden",
        backgroundColor: "white",
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

const EventSidebar = (props) => {
  const classes = useStyles();

  const [post, setPostArray] = useState([]);
  var x;
  const [alertValue, setAlertValue] = React.useState("");
  const [alertTitle, setAlertTitle] = React.useState("");
  const [DisplayValue, setDisplayValue] = React.useState("");
  const history = useHistory();

  const imgData = (event) => {
    return ProjectData[Math.floor(Math.random() * ProjectData.length)].imageUrl;
  };
  const showEvent = (eventId, x) => {
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

  return (
    <form noValidate autoComplete="off" className={classes.form}>
      <Paper elevation={14}>
        <h1>Current Events</h1>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">September</ListSubheader>
          </GridListTile>
          {post.map(
            (item) => (
              localStorage.getItem(`imageIdEvent${item.eventId}`) === ""
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
        </GridList>{" "}
      </Paper>
    </form>
  );
};
export default EventSidebar;
