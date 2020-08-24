import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

/*
const CreateEvent =(props) =>{
    return(
        <div>
            <h1>This is the Create Event Page</h1>
        </div>
    )
}
*/

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
  },
}));


//const CreateEvent =(props) =>{

//export default function Checkout() {
const CreateEvent =(props) =>{
  const classes = useStyles();

  return (
      <React.Fragment>
       <Typography variant="h6" gutterBottom>
         Shipping address
       </Typography>
       <Grid container spacing={3}>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             id="firstName"
             name="firstName"
             label="Event Name"
             fullWidth
             autoComplete="given-name"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             id="lastName"
             name="lastName"
             label="Event Type"
             fullWidth
             autoComplete="family-name"
           />
         </Grid>
         <Grid item xs={12}>
           <TextField
             required
             id="address1"
             name="address1"
             label="Describtion"
             fullWidth
             autoComplete="shipping address-line1"
           />
         </Grid>
         <Grid item xs={12}>
           <TextField
             id="address2"
             name="address2"
             label="Event Notes"
             fullWidth
             autoComplete="shipping address-line2"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required
             id="city"
             name="city"
             label="Event city"
             fullWidth
             autoComplete="shipping address-level2"
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

/*
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>*/
  );
}


export default CreateEvent;
