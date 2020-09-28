import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
//import { tileData } from  '../Data/titleData';
import tileData from "./tileData";
import image1 from '../Data/image1.jpeg';
import image2 from '../Data/image2.jpg';
import image3 from '../Data/image3.jpg';
import image4 from '../Data/image4.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formtwo: {
      margin: theme.spacing(5, 2, 5, 5),
      width: theme.spacing(80),
      height: theme.spacing(100),
      justifyContent: 'auto',
      overflow: 'hidden',
      backgroundColor: 'white',
    },

    form: {
       margin: theme.spacing(5, 5, 5, 2),
       width: theme.spacing(65),
       height: theme.spacing(100),
       justifyContent: 'auto',
       overflow: 'hidden',
       backgroundColor: 'white',
     },
  noPadding: {
    padding: 0,
  },
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
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
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  root_two: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const CreateEvent = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("Controlled");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const tileData = [
    {
     img: image1,
     title: 'Image',
      author: 'author',
     },
     {
      img: image2,
      title: 'Image1',
      author: 'author1',
      },
      {
       img: image3,
       title: 'Image1',
       author: 'author1',
       },
       {
        img: image4,
        title: 'Image1',
        author: 'author1',
        },
        {
         img: image1,
         title: 'Image1',
         author: 'author1',
         },
         {
          img: image2,
          title: 'Image1',
          author: 'author1',
          },
          {
           img: image3,
           title: 'Image1',
           author: 'author1',
           },

   ];

  return (
    <div className={classes.root}>
      <form noValidate autoComplete="off" className={classes.formtwo}>
        <Paper elevation={6}>
          <h1>This is the Create Event Page</h1>
          <React.Fragment>
       <Typography variant="h6" gutterBottom>
         Event Details
       </Typography>
       <Grid container spacing={3} >
         <Grid item xs={12} sm={6}>
           <TextField
             required
             id="EventName"
             name="Event Name"
             label="Event Name"
             fullWidth
             autoComplete="Event-Name"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             id="EventType"
             name="Event Type"
             label="Event Type"
             fullWidth
             autoComplete="Event-Type"
           />
         </Grid>
         <Grid item xs={12}>
           <TextField
             required
             id="Describtion1"
             name="Describtion"
             label="Describtion"
             fullWidth
             autoComplete="Describtion1"
           />
         </Grid>
         <Grid item xs={12}>
           <TextField
             id="EventNotes"
             name="Event Notes"
             label="Event Notes"
             fullWidth
             autoComplete="Event-Notes"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             id="EventCity"
             name="Event city"
             label="Event city"
             fullWidth
             autoComplete="Event-City"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField id="state" name="state" label="State/Province/Region" fullWidth />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             id="zip"
             name="zip"
             label="Zip / Postal code"
             fullWidth
             autoComplete="shipping postal-code"
           />
         </Grid>
         <Grid item xs={12}>
           <FormControlLabel
             control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
             label="I confirm the details above"
           />
         </Grid>
       </Grid>
     </React.Fragment>

            <Grid xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>

        </Paper>
      </form>


        <form noValidate autoComplete="off" className={classes.form}>
          <Paper elevation={6}>
            <h1>Current Events</h1>



            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">September</ListSubheader>
                </GridListTile>
                                {tileData.map((tile) => (
                <GridListTile key={tile.img}>
                                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                                title={tile.title}
                                subtitle={<span>by: {tile.author}</span>}
                                actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                    <InfoIcon />
                </IconButton>
                }
                />
                </GridListTile>
       ))}
     </GridList>


     </Paper>
     </form>
    </div>
  );
};
export default CreateEvent;
