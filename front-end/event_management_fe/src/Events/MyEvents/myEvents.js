import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getHeaderToken, getToken, getUserID } from "../../Login/JwtConfig";
import MyEventCard from "../cards/MyEventCard";
import { getUserName } from "../../Login/JwtConfig";
import Snackbars from "../../Shared/Snackbar";
import noData from "../noData.jpg";
import { getUserPlatformAPIPort} from "../../Login/JwtConfig";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(8),
    width:"200",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:  "#F5F4F2"

  },
  outsidePaper: {
    marginBottom: theme.spacing(8),
    marginLeft: theme.spacing(30),
    marginRight: theme.spacing(30),
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: "#FDBAA5",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const MyEvents = (props) => {
  const classes = useStyles();
  const [post, setPostArray] = useState([]);

  const history = useHistory();
  // snackBar
  const [alertValue, setAlertValue] = React.useState("");
  const [DisplayValue, setDisplayValue] = React.useState("");

  useEffect(() => {
    const userId = getUserID();
    console.log("called");
    axios
      .get(
        `${getUserPlatformAPIPort()}api/EventController/ViewUserEvents/${userId}`
      )
      .then(
        (res) => {
          if (res.status === 200) {
            setPostArray(res.data);
            // console.log(res.data[0].eventTitle);
          }
        },
        (error) => {
          setDisplayValue(true);
          setAlertValue(0);
        }
      );
  });

  return (
    <div className={classes.paper}>
      {" "}
      {post.length == 0 ? (
        <>
          <img src={require("../noData.jpg")}  />
          <Typography variant="h2">No Data found this time, come back soon</Typography>

        </>
      ) : (
        <Paper elevation={5} className={classes.outsidePaper}>
        <Snackbars
            title={"Backend"}
            alertValue={alertValue}
            DisplayValue={DisplayValue}
          />{" "}
          <Typography variant={"h2"} >My Events</Typography>
          {console.log(post)}
          {post.map((item) => (
            <div key={item}>
                <MyEventCard
                  eventId={item.eventId}
                  eventTitle={item.eventTitle}
                  eventDate={item.eventDate.slice(0, 10)}
                  eventVenue={item.location.locationName}
                  eventDescription={item.bodyText}
                  eventOrgainser={getUserName()}
                  eventPrice={item.eventTicketPrice}
                />
            </div>
          ))}
        </Paper>
      )}
    </div>
  );
};

export default MyEvents;
