import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { getUserPlatformAPIPort} from "../../Login/JwtConfig";

export default class Schedule extends Component {
  // declare any necessary functions such as handleDateClick, etc.

  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    let apiData = [];

    axios
      .get(
        `${getUserPlatformAPIPort()}api/EventController/SearchEventsByDate/${"06-10-2020"}/1?resultLimit=20`
      )
      .then(
        (res) => {
          if (res.status === 200) {
            res.data.map((item) => {
              var myObject = {};
              // console.log(item.eventTitle);
              myObject["title"] = item.eventTitle;
              //console.log(item.eventDate.slice(0, 10));
              myObject["start"] = item.eventDate.slice(0, 10);
              apiData.push(myObject);
            });
            this.setState({
              events: apiData
            });
          }
        },
        (error) => {
          alert("something Went Wrong");
        }
      );

    console.log(apiData);
   

  }

  formatEvents() {
    return this.props.appointments.map((appointment) => {
      const { title, end, start } = appointment;

      let startTime = new Date(start);
      let endTime = new Date(end);

      return {
        title,
        start: startTime,
        end: endTime,
        extendedProps: { ...appointment },
      };
    });
  }

  handleEventClick = ({ event }) => {
    // openAppointment is a function I wrote to open a form to edit that appointment
    this.props.openAppointment(event.extendedProps);
  };

  handleEventDrop = (info) => {
    if (window.confirm("Are you sure you want to change the event date?")) {
      console.log("change confirmed");

      // updateAppointment is another custom method
      this.props.updateAppointment({
        ...info.event.extendedProps,
        start: info.event.start,
        end: info.event.end,
      });
    } else {
      console.log("change aborted");
    }
  };

  render() {
    console.log(this.state.events);
 
    return (
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}
        editable={true}
        eventDrop={this.handleEventDrop}
        eventClick={this.handleEventClick}
        events={this.state.events}
      />
    );
  }
}
