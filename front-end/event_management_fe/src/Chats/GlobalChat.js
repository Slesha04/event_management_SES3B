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

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 50,
    padding: theme.spacing(3, 2),      
    height: theme.spacing(150),
    width: theme.spacing(150),
    marginRight:20
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  topicsWindow: {
    width: "30%",
    height: "450px",
    borderRight: "1px ridge navy",
  },
  chatWindow: {
    width: "70%",
    height: "450px",
    padding: "20px",
  },
  chatBox: {
    width: "85%",
  },
  button: {
    width: "15%",
  },
}));

export default function GlobalChat() {
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
          <Paper>
            <Typography variant="h4">Global Chat</Typography>
            <Typography component="h3">{activeTopic}</Typography>
            <div className={classes.flex}>
              <div className={classes.topicsWindow}>
                <List>
                  {topic.map((topic) => (
                    <ListItem
                      onClick={(e) => changeActiveTopic(e.target.innerText)}
                      key={topic}
                      button
                    >
                      <ListItemText primary={topic}></ListItemText>
                    </ListItem>
                  ))}
                </List>
              </div>
              <div className={classes.chatWindow}>
                <List>
                  {allChats[activeTopic].map((chat, i) => (
                    <div className={classes.flex} key={i}>
                      <Typography variant="caption">{chat.from}</Typography>
                      <Chip label={chat.msg} className={classes.Chip}></Chip>
                    </div>
                  ))}
                </List>
              </div>
            </div>
            <div className={classes.flex}>
              <TextField
                id="standard-basic"
                label="Type your text here"
                className={classes.chatBox}
                value={textValue}
                onChange={(e) => changeTextValue(e.target.value)}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  sendChatAction({
                    from: user,
                    msg: textValue,
                    topic: activeTopic,
                  });
                  changeTextValue("");
                }}
              >
                Send
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
