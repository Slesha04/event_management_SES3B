import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { getHeaderToken } from "../Login/JwtConfig";
import { useHistory } from "react-router-dom";
import DynamicFeedSharpIcon from "@material-ui/icons/DynamicFeedSharp";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  //avis code
  const history = useHistory();

  useEffect(() => {
    // Update the document title using the browser API
    axios
      .get("/protected", { headers: { Authorization: getHeaderToken() } })
      .then((res) => {
        this.setState({
          user: res.data,
          userType: res.data["userType"],
        });
        console.log("NAVBAR", res.data["userType"]);
      });
  });

  const logout = () => {
    const body = {};

    axios
      .post(`https://localhost:5001/api/UserController/LogoutUser`,
      body, {
        headers: {
          Authorization: getHeaderToken(),
        },
      })
      .then(
        (res) => {
          console.log(res);
          alert("You are logged out");
          Cookies.remove("auth-cookie");
          Cookies.remove("userID");
          history.push("/login");
        },
        (error) => {
          console.log(error);
          alert("try again");
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
            <li className="nav-item">
              <Link
                to="/homePage"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <i class="fas fa-home"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/global-chat"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <i class="fas fa-comment-alt"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/createEvent"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <i class="fas fa-person-booth"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/myEvents"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <i class="fas fa-mail-bulk"></i>
              </Link>
            </li>
          </ul>

          {button && (
            <Button onClick={logout} buttonStyle="btn--outline">
              <i class="fas fa-sign-in-alt"></i>
            </Button>
          )}
        </div>
        <div className="nav-item">
          <Link
            to="/MyEventRoster"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            <DynamicFeedSharpIcon fontSize="medium" />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
