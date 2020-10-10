import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { getHeaderToken, getUserName } from "../Login/JwtConfig";
import { useHistory } from "react-router-dom";
import DynamicFeedSharpIcon from "@material-ui/icons/DynamicFeedSharp";
import Snackbars from "../Shared/Snackbar";
import { getUserPlatformAPIPort } from "../Login/JwtConfig";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import avatar from "./avatar.jpg";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);
function Navbar() {
  const classes = useStyles();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
   // snackBar
  const [alertValue, setAlertValue] = React.useState("");
  const [DisplayValue, setDisplayValue] = React.useState("");
 const[val,setVal] = React.useState("");
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showUserProfile = () => {
    history.push("/profile");
  };
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  //avis code
  const history = useHistory();

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   axios
  //     .get("/protected", { headers: { Authorization: getHeaderToken() } })
  //     .then((res) => {
  //       this.setState({
  //         user: res.data,
  //         userType: res.data["userType"],
  //       });
  //       console.log("NAVBAR", res.data["userType"]);
  //     });
  // });

  const logout = () => {
    const body = {};

    axios
      .post(`${getUserPlatformAPIPort()}api/UserController/LogoutUser`, body, {
        headers: {
          Authorization: getHeaderToken(),
        },
      })
      .then(
        (res) => {
          setAlertValue(1);

          console.log(res);
          Cookies.remove("auth-cookie");
          Cookies.remove("userID");
          Cookies.remove("user-platform-api-port");
          localStorage.setItem("userName","")

          setDisplayValue(true);
          setTimeout(() => {
            history.push("/login");
            setDisplayValue(false);
          }, 1000);
        },
        (error) => {
          console.log(error);
          setDisplayValue(true);
          setAlertValue(0);
          setTimeout(() => {
            setDisplayValue(false);
          }, 1500);
        }
      );
  };

  //------------------------------------------------------------

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link
            to="/homePage"
            className="navbar-logo"
            onClick={closeMobileMenu}
          >
            UTS:EVENTS <i class="fas fa-glass-cheers" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* <Tooltip title="Home">
              <li className="nav-item">
                <Link
                  to="/homePage"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <i class="fas fa-home"></i>
                </Link>
              </li>
            </Tooltip> */}

            <Tooltip title="Search event">
              <div className="nav-item">
                <Link
                  to="/all-events"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <i class="fas fa-search"></i>
                </Link>
              </div>
            </Tooltip>
            <Tooltip title="Global Chat">
              <li className="nav-item">
                <Link
                  to="/global-chat"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <i class="fas fa-comment-alt"></i>
                </Link>
              </li>
            </Tooltip>

            <Tooltip title="Create Events">
              <li className="nav-item">
                <Link
                  to="/createEvent"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <i class="fas fa-person-booth"></i>
                </Link>
              </li>
            </Tooltip>

            <Tooltip title="My Events">
              <li className="nav-item">
                <Link
                  to="/myEvents"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <i class="fas fa-mail-bulk"></i>
                </Link>
              </li>
            </Tooltip>
          </ul>

         
        </div>
        <Tooltip title="Checked-in Events ">
          <div className="nav-item">
            <Link
              to="/MyEventRoster"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              <DynamicFeedSharpIcon fontSize="medium" />
            </Link>
          </div>
        </Tooltip>

        <Tooltip title="Events Calendar ">
          <div className="nav-item">
            <Link
              to="/events-calendar"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              <i class="fas fa-calendar-alt"></i>
            </Link>
          </div>
        </Tooltip>

        <Tooltip title="User Profile">
          <div>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
              onClick={showUserProfile}
              label={"fff"}
            >
              <Avatar alt="Remy Sharp" src={avatar} className={classes.large} />
            </StyledBadge>
            <Typography>{localStorage.getItem("userName")}</Typography>
          </div>
        </Tooltip>
        {button && (
            <Tooltip title="Logout">
              <Button onClick={logout} buttonStyle="btn--outline">
                <i class="fas fa-sign-in-alt"></i>
              </Button>
            </Tooltip>
          )}
      </nav>
      <Snackbars
        title={alertValue == 0 ? "try again" : "Account logout,"}
        alertValue={alertValue}
        DisplayValue={DisplayValue}
      />
    </>
  );
}

export default Navbar;
