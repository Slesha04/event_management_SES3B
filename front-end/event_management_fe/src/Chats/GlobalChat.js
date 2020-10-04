import React from 'react'
import "./GlobalChat.css"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
    margin : 50,
    padding: theme.spacing(3,2)
    },
    flex: {
        display: 'flex',
        height:'500px'
    },
    topicsWindow: {
        width: '30%',
        height: '500px',
        borderRight: '1px ridge navy'
    },
    chatWindow: {
        width: '70%'
    },
    chatBox: {
        width: '85%'
    },
    button: {
        width: '15%'
    },
  }));

export default function GlobalChat(){
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Paper>
            <Typography variant="h4">Global Chat</Typography>
            <Typography component="h3">Topic Placeholder</Typography>
            <div className={classes.flex}>
            <div className={classes.topicsWindow}>
                <List>
                    {
                        ["#general"].map(topic =>(
                            <ListItem key={topic} button>
                                <ListItemText primary={topic}></ListItemText>
                            </ListItem>
                        ))
                    }
                    
                </List>
            </div>
            <div className={classes.chatWindow}>
            <h5>Yo</h5>
            </div>
        </div>
        </Paper>
        
        </div>
 
    );
}