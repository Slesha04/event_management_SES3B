
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { getHeaderToken, getToken, getUserID } from "../Login/JwtConfig";
import { getUserPlatformAPIPort } from "../Login/JwtConfig";
import Snackbars from "../Shared/Snackbar";
import InfoIcon from "@material-ui/icons/Info";
import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: theme.spacing(150),
    width: theme.spacing(400),
   },
  form: {
    margin: theme.spacing(5, 0, 60, 50),
    width: theme.spacing(50),
    height: theme.spacing(120),
    // justifyContent: "auto",
    overflow: "hidden",
    backgroundColor: "white",
  },
  gridList: {
    width: 400,
    height: 400,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "white",
  },
}));

 
const ProjectData = [
  {
    imageUrl: require("./dummyData/img1.jpg"),
    title: "Image",
    author: "author",
    featured: true,
  },
  {
    imageUrl: require("./dummyData/img2.jpg"),
    title: "Image",
    author: "author",
    featured: true,
  },
  {
    imageUrl: require("./dummyData/img3.jpg"),
    title: "Image",
    author: "author",
    featured: true,
  },
  {
    imageUrl: require("./dummyData/img4.jpg"),
    title: "Image",
    author: "author",
    featured: true,
  },
  {
    imageUrl: require("./dummyData/img6.jpg"),
    title: "Image",
    author: "author",
    featured: true,
  },
  {
    imageUrl: require("./dummyData/img7.jpg"),
    title: "Image",
    author: "author",
    featured: true,
  },
  {
    imageUrl: require("./dummyData/img8.jpg"),
    title: "Image",
    author: "author",
    featured: true,
  },
  {
    imageUrl: require("./dummyData/img9.jpg"),
    title: "Image",
    author: "author",
    featured: true,
  },
  {
    imageUrl: require("./dummyData/img10.jpg"),
    title: "Image",
    author: "author",
    featured: true,
  },
  {
    imageUrl: require("./dummyData/img11.jpg"),
    title: "Image",
    author: "author",
    featured: true,
  },
];

export default function EventSidebar() {
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
    <div className={classes.form}>
      <Paper elevation={14}>
        <h1>Events You might like</h1>{" "}
        <ListSubheader component="div">October</ListSubheader>
        <div className={classes.root}>
          <GridList
            cellHeight={200}
            spacing={1}
            className={classes.gridList}
            style={{ height: "auto" }}
          >
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
                    cols={true ? 2 : 1}
                    rows={true ? 2 : 1}
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
        </div>
      </Paper>
    </div>
  );
}
