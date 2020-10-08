import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  
export default function Snackbars(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    return (
        <Snackbar open={props.DisplayValue} autoHideDuration={15000} onClose={props.DisplayValue}>
        {props.alertValue == 0 ? (
          <Alert onClose={handleClose} severity="error">
            <Typography variant="h5">{props.title} error! </Typography>
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            <Typography variant="h5"> {props.title} success!</Typography>
          </Alert>
        )}
      </Snackbar>
    );
  }