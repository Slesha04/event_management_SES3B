import React from "react";
import "./GlobalChat.css";

//fix imports to be from one line

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { getHeaderToken, getToken, getUserID } from "../Login/JwtConfig";
import EventSidebar from "../Events/EventsSidebar";
import { CTX } from "./ChatStore";
import { teal } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 50,
    padding: theme.spacing(3, 2),      
    height: theme.spacing(150),
    width: theme.spacing(150),
    marginRight:20,
    backgroundColor: "rgba(127,157,180,0.2)"
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  topicsWindow: {
    width: "30%",
    height: "500px",
    // borderRight: "1px ridge rgba(127,157,180,0.2)",
  },
  chatWindow: {
    width: "70%",
    height: "450px",
    padding: "60px",
    backgroundColor: "rgba(76,105,137,0.2)",
  },
  chatBox: {
    width: "57%",
    // backgroundColor:"rgba(76,105,137,0.05)",
  },
  button: {
    width: "6%",
    color: "white",
    backgroundColor : "#b63160",
  },
  line:{
    color: "rgba(76,105,137,0.10)"
  },
  TypographyStyle:{
    color: "rgb(4, 44, 84)",
    fontFamily: `sans-serif`,
    fontSize: 30,
    fontWeight: "bold",
  },
  Other:{
    backgroundColor: "rgba(4, 44, 84, 0.10)",
  }
}));

export default function EventChat() {
  const classes = useStyles();
  const { allChats, sendChatAction, user } = React.useContext(CTX);
  const topic = Object.keys(allChats);

  //local state
  const [activeTopic, changeActiveTopic] = React.useState(topic[0]);
  const [textValue, changeTextValue] = React.useState(" ");

  return (
    <Grid container direction="row"   alignItems="center">
      {" "}
      <Grid item xs={12} sm={6}>
        <div className={classes.root}>
          <Paper className={classes.Other}>
            <Typography 
            className={classes.TypographyStyle} 
            // color = "secondary"
            variant="h4">
            <i class="fas fa-glass-cheers"></i></Typography>
            <Typography 
            className={classes.TypographyStyle}
            component="h3"
            >{activeTopic}</Typography>
            <div className={classes.flex}>
              <div className={classes.topicsWindow}>
                <List>
                  {topic.map((topic) => (
                    <ListItem
                    className="send-message-form"
                      onClick={(e) => changeActiveTopic(e.target.innerText)}
                      key={topic}
                      button
                    >
                      <ListItemText 
                      className="rooms-list > ul"
                      primary={topic}></ListItemText>
                    </ListItem>
                  ))}
                </List>
              </div>
              <div className={classes.chatWindow}>
                <List>
                  {allChats[activeTopic].map((chat, i) => (
                    <div className={classes.flex} key={i}>
                      <Typography variant="caption"
                      className="message-username"
                      >{chat.from}
                      </Typography>
                      <Chip label={chat.msg} className="message .message-text"></Chip>
                    </div>
                  ))}
                </List>
              </div>
            </div>
            <div className={classes.flex}>
            <div><Typography className={classes.line}>__________________________________---</Typography></div>
              <TextField
                id="standard-basic"
                label="Type your text here"
                className={classes.chatBox}
                value={textValue}
                onChange={(e) => changeTextValue(e.target.value)}
              />
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => {
                  sendChatAction({
                    from: user,
                    msg: textValue,
                    topic: activeTopic,
                  });
                  changeTextValue("");
                }}
              >
                <i class="fa fa-paper-plane" aria-hidden="true"></i>
              </Button>
            </div>
          </Paper>
        </div>
      </Grid> 
      <Grid item xs={6} sm={3}>
        <EventSidebar />
      </Grid>
    </Grid>
  );
}
