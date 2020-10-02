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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useEffect, useState } from "react";
import { getHeaderToken, getToken, getUserID } from "../Login/JwtConfig";
import MyEventCard from "./cards/MyEventCard";
import { getUserName } from "../Login/JwtConfig";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  outsidePaper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    marginLeft: theme.spacing(30),
    marginRight: theme.spacing(30),
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
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

const UploadFiles = (props) => {
  const classes = useStyles();
  const [post, setPostArray] = useState([]);

  const history = useHistory();

  const handleUplaod = (event) => {
    event.preventDefault();

    const body = {
      EventCoverImage: {
        FileId: 1,
        FileName: "popyMarloe",
        FileContent: "string",
        FileSize: 0,
        EventId: 0,
        ChannelId: 0,
        Channel: {
          ChannelId: 0,
          ChannelName: "string",
          ChannelImage: "string",
          IsGlobal: true,
          ChannelCode: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          CurrentSequenceNumber: 0,
          Media: [null],
        },
        UploaderId: 0,
        DateUploaded: "2020-10-02T05:29:13.074Z",
      },
      EventVideoTrailer: {
        FileId: 0,
        FileName: "string",
        FileContent: "string",
        FileSize: 0,
        EventId: 0,
        ChannelId: 0,
        Channel: {
          ChannelId: 0,
          ChannelName: "string",
          ChannelImage: "string",
          IsGlobal: true,
          ChannelCode: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          CurrentSequenceNumber: 0,
          Media: [null],
        },
        UploaderId: 0,
        DateUploaded: "2020-10-02T05:29:13.074Z",
      },
    };

    console.log();
    console.log(getHeaderToken());
    const res = axios
      .put(
        `https://localhost:5001/api/EventController/AssignFilesToEvent`,
        body
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
   };

  return (
    <div>
      <Typography variant={"h4"}>Upload Files</Typography>
      <Button >Upload </Button>
      <Paper elevation={5}>
      <FileSelector/>
      </Paper>
    </div>
  );
};

 
let handleChange = e => {
  var files = e.target.files;
  var filesArray = [].slice.call(files);
  filesArray.forEach(e => {
    console.log(e.name);
    console.log(e.size);
    console.log(e.type);
    console.log(e.lastModifiedDate);
  });
};

let FileSelector = () => {
  return (
    <div>
      <h1>File Selector</h1>
      <input type="file" onChange={e => handleChange(e)} />
    </div>
  );
};

 
export default UploadFiles;
