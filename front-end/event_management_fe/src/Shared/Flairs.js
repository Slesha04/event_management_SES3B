import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function Flairs(props) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: props.eventType, color: "#2db92d" },
    { key: 1, label: props.ticketTypes, color: "#ffaf4d" },
    { key: 2, label: props.eventVisibilityTypes, color: "yellow" },
    { key: 3, label: props.UTSEvent, color: "#d55d5d" },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  useEffect(() => {

    setChipData([
      { key: 0, label: props.eventType, color: "#2db92d" },
      { key: 1, label: props.ticketTypes, color: "#ffaf4d" },
      { key: 2, label: props.eventVisibilityTypes, color: "yellow" },
      { key: 3, label: props.UTSEvent, color: "#d55d5d" },
    ]);
  }, [ props.eventType ,
  props.ticketTypes,
   props.eventVisibilityTypes,
   props.UTSEvent ]);

  return (
    <Paper component="ul" className={classes.root}>
      <Typography component="div" variant={"h5"}>
        {" "}
        Event Flairs :
      </Typography>{" "}
      {chipData.map((data) => {
        let icon;

        if (data.label === "React") {
          icon = <TagFacesIcon />;
        }

        return (
          <li key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={data.label === "React" ? undefined : handleDelete(data)}
              className={classes.chip}
              style={{ backgroundColor: data.color, fontSize: "20px" }}
            />
          </li>
        );
      })}
    </Paper>
  );
}
