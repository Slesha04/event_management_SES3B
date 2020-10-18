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
import Snackbars from "../Shared/Snackbar";
import DesktopMacTwoToneIcon from "@material-ui/icons/DesktopMacTwoTone";
import LaptopWindowsTwoToneIcon from "@material-ui/icons/LaptopWindowsTwoTone";
import { IconButton } from "@material-ui/core";
import { getUserPlatformAPIPort} from "../Login/JwtConfig";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
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

//export default function SignUp() {
const Login = (props) => {
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [uservalue, setUservalue] = React.useState("");

  // snackBar
  const [alertValue, setAlertValue] = React.useState("");
  const [DisplayValue, setDisplayValue] = React.useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const history = useHistory();

  const handleAPIPortNumMac = (event) => {
    setUservalue("http://localhost:5000/");
  };
  const handleAPIPortNumWindows = (event) => {
    setUservalue("https://localhost:5001/");
  };
  
  const handleRegister = (event) => {
    event.preventDefault();
    Cookies.set("user-platform-api-port",uservalue);
    console.log("user-platform-api-port -"+uservalue);
    axios
      .get(
        `${getUserPlatformAPIPort()}api/UserController/LoginUser/${username}/${password}`
      )
      .then(
        (res) => {
          // user id - console.log(res.data.jwtToken.payload.user_id);
          setAlertValue(1);
          console.log(res.data.encodedForm);
          Cookies.set("auth-cookie", res.data.encodedForm);
          Cookies.set("auth-full-cookie", res.data);
          
          const userId = res.data.jwtToken.payload.user_id;
          Cookies.set("userID", userId);
          Cookies.set("userName", username);
          localStorage.setItem("userName",username);
          // snackbar
          setDisplayValue(true);
          setTimeout(() => {
            history.push("/homePage");
            window.location.reload(false);

          }, 500);
        },
        (error) => {
          setDisplayValue(true);
          setAlertValue(0);
        }
      );
  };

  return (
    <>
      <Paper variant="outlined" className={classes.outsidePaper} elevation={3}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <form className={classes.form} onSubmit={handleRegister} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="fullName"
                    variant="outlined"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    value={username}
                    onChange={handleUsernameChange}
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="Remember Me" color="primary" />}
                    label="Remember me"
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log In
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/Register" variant="body2">
                    Don't Have an account yet? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <IconButton classes={{ label: classes.iconButtonLabel }} onClick={handleAPIPortNumMac}>
                <DesktopMacTwoToneIcon style={{ fontSize: 60 }} />
                <div>Mac</div>
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              <IconButton classes={{ label: classes.iconButtonLabel }} onClick={handleAPIPortNumWindows}>
                <LaptopWindowsTwoToneIcon style={{ fontSize: 60 }} />
                <div>Windows</div>
              </IconButton>
            </Grid>
          </Grid>
        </Container>

        <Snackbars
          title={"Log In"}
          alertValue={alertValue}
          DisplayValue={DisplayValue}
        />
      </Paper>
    </>
  );
};

export default Login;
