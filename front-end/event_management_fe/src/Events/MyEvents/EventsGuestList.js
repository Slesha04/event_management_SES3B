import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useEffect, useState } from "react";
import { getHeaderToken, getToken, getUserID } from "../../Login/JwtConfig";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { Checkbox } from "semantic-ui-react";
import Button from "@material-ui/core/Button";
import { getUserPlatformAPIPort } from "../../Login/JwtConfig";
import Typography from "@material-ui/core/Typography";
import Snackbars from "../../Shared/Snackbar";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
    border: "2px solid rgb(0, 0, 0)",
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
}));

function createData(
  attendeeId,
  attendeeUsername,
  dateRegistered,
  inputCode,
  attendeeArrived
) {
  return {
    attendeeId,
    attendeeUsername,
    dateRegistered,
    inputCode,
    attendeeArrived,
  };
}

export default function EventsGuestList() {
  const classes = useStyles();
  const [post, setPostArray] = useState([]);

  let selectedCardId = localStorage.getItem("selectedCard");
  // snackBar
  const [alertValue, setAlertValue] = React.useState("");
  const [alertTitle, setAlertTitle] = React.useState("");
  const [DisplayValue, setDisplayValue] = React.useState("");
  // function handleMarkAttende(inputCode){
  //   const body = {};
  //   console.log(getHeaderToken())
  //   const res =  axios.put(`https://localhost:5001/api/EventRosterController/MarkAttendeeSelf/${inputCode}/${selectedCardId}`, body, {
  //     headers: {
  //       Authorization:  getHeaderToken()
  //     }
  //   }).then(
  //       (res) => {
  //           if(res.status === 200)
  //               alert("Attendee Marked");
  //       },
  //       (error) => {
  //         alert("something went wrong", error);
  //         console.log(error)
  //       }
  //     );
  // };

  useEffect(() => {
    const rows = [];

    axios
      .get(
        `${getUserPlatformAPIPort()}api/EventRosterController/GetRosterByEvent/${selectedCardId}`,
        {
          headers: {
            Authorization: getHeaderToken(),
          },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem(
              `peopleGoing${selectedCardId}`,
              res.data.length
            );
            res.data.map(
              (item) =>
                rows.push(
                  createData(
                    item.attendeeId,
                    item.attendeeUsername,
                    item.dateRegistered,
                    item.inputCode,
                    item.attendeeArrived
                  )
                )
              //console.log(createData(item.attendeeId, item.attendeeUsername, item.dateRegistered, item.inputCode))
            );
            setPostArray(rows);
          }
        },
        (error) => {
          setAlertTitle("Backend");
          setDisplayValue(true);
          setAlertValue(0);
        }
      );
  }, []);

  return (
    <>
      <Snackbars
        title={alertTitle}
        alertValue={alertValue}
        DisplayValue={DisplayValue}
      />
      {post.length == 0 ? (
        <>
          <img src={require("../noData.jpg")} />
          <Typography variant="h2">
            No Data found this time, come back soon
          </Typography>{" "}
        </>
      ) : (
        <>
          <div className={classes.outsidePaper}>
            <Typography variant={"h3"}>My Events GuestList</Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">AttendeeId</StyledTableCell>
                    <StyledTableCell align="right">
                      Attendee Name
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Date Registered
                    </StyledTableCell>
                    <StyledTableCell align="right">Input Code</StyledTableCell>
                    <StyledTableCell align="right">
                      Attende Arrived
                    </StyledTableCell>
                    {/* <StyledTableCell align="right">
                      {" "}
                      Mark Attende
                    </StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {post.map((row) => (
                    <StyledTableRow key={row.attendeeId}>
                      <StyledTableCell align="right">
                        {row.attendeeId}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.attendeeUsername}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.dateRegistered.slice(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.inputCode}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.attendeeArrived ? "Yes" : "No"}
                      </StyledTableCell>
                      {/* <StyledTableCell>
              <Button color="primary" size="medium" onClick={() => handleMarkAttende(row.inputCode)}>
                {" "}
                Mark Attende
              </Button>
              </StyledTableCell> */}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              {/* <Button color="primary" size="medium" onClick={handleRemoveAttende}>
        {" "}
        Remove Attende
      </Button>

      <Button color="primary" size="medium" onClick={handleAddAttende}>
        {" "}
        Add Attende
      </Button> */}
            </TableContainer>{" "}
          </div>
        </>
      )}
    </>
  );
}
