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
import Paper from "@material-ui/core/Paper";
import { getHeaderToken, getToken, getUserID } from "../Login/JwtConfig";
import Snackbars from "../Shared/Snackbar";

/* https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-up/SignUp.js*/

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

//export default function SignUp() {
const Registration = (props) => {
  /*return(
        <div>
            <h1>This is the Registration page</h1>
        </div>
    )*/
  const classes = useStyles();
  const [gender, setGender] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");

  const [alertValue, setAlertValue] = React.useState("");

  const [DisplayValue, setDisplayValue] = React.useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };
  const history = useHistory();

  const handleRegister = (event) => {
    event.preventDefault();
    if (
      username !== "" ||
      password !== "" ||
      birthDate !== "" ||
      gender !== "" ||
      email !== ""
    ) {
      //logout previous user
      axios
        .put(`https://localhost:5001/api/UserController/LogoutUser`, {
          headers: {
            Authorization: getHeaderToken(),
          },
        })
        .then(
          (res) => {
            console.log("Successfully logged out!");
          },
          (error) => {
            console.log(" log out dosent work!");
          }
        );

      //register user
      axios
        .get(
          `https://localhost:5001/api/UserController/RegisterUser/${username}/${birthDate}/${gender}/${email}/${password}`
        )
        .then(
          (res) => {
            Cookies.set("auth-cookie", res.data.access_token);
            setDisplayValue(true);
            setAlertValue(1);
            setTimeout(() => {
              history.push("/homePage");
            }, 2500);
          },
          (error) => {
            setDisplayValue(true);
            setAlertValue(0);
          }
        );
    }else {
      setDisplayValue(true);
      setAlertValue(0);
    }
  };

  return (
    <Paper variant="outlined" className={classes.outsidePaper} elevation={3}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
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

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Gender*</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <MenuItem value={10}>Female</MenuItem>
                  <MenuItem value={20}>Male</MenuItem>
                  <MenuItem value={30}>Other</MenuItem>
                </Select>
              </FormControl>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  defaultValue="2017-05-24"
                  value={birthDate}
                  onChange={handleBirthDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
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
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      <Snackbars
        title={"Registration"}
        alertValue={alertValue}
        DisplayValue={DisplayValue}
      />
    </Paper>
  );
};

export default Registration;
