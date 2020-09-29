import React, { Component } from "react";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import { getHeaderToken, getToken, getUserID } from "../Login/JwtConfig";
import { Button, Header, Grid, Form } from "semantic-ui-react";
import axios from "axios";

class CreateEvent extends Component {
    componentDidMount() {
console.log(getUserID())       
        axios
          .get("/protected", { headers: { Authorization: getHeaderToken() } })
          .then((res) => {
            this.setState({
              user: res.data,
            });
            Cookies.set("username", res.data['name']);
            Cookies.set("userid", res.data['id']);
            // this.getCreatedTasks();
          });
      }

  constructor(props) {
    super(props);

    this.state = {
      eventTitle: "",
      eventDetails: "",
      eventLocation: "",
      eventDate: "",
      RegistrationSuccessful: Boolean,
      ticketPrice: 0,
      eventType : 0,
      eventVisibility : 0,
      registrationMessage: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.onRadioChangeTicketPrice = this.onRadioChangeTicketPrice.bind(this);
    this.onRadioChangeEventType = this.onRadioChangeEventType.bind(this);
    this.onRadioChangeEventVisibility = this.onRadioChangeEventVisibility.bind(this);

  }
 
  form = {
    width: "40%",
    margin: "0 auto",
    marginTop: "2%",
  };

  formContainer = {
    width: "100%",
    textAlign: "center",
  };

  submitButton = {
    marginTop: "1%",
  };

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleRegister() {
    const body = {};
    const res =  axios.put(`http://localhost:5000/api/EventController/CreateEvent/${this.state.eventTitle}/${this.state.eventDetails}/${this.state.eventLocation}/${this.state.eventDate}/${this.state.ticketPrice}/${this.state.eventType}/${this.state.eventVisibility}`, body, {
      headers: {
        'Authorization':  getHeaderToken()  
      }
    }).then(
        (res) => {
            if(res.status === 200)
                alert("Create Event Success");
        },
        (error) => {
          alert("Create Event Error", error);
        }
      );
      
  }

  emptyFields() {
    return (
      this.state.name == "" ||
      this.state.email == "" ||
      this.state.password == ""
    );
  }

  onRadioChangeTicketPrice = (e) => {
    this.setState({
        ticketPrice: parseInt(e.target.value),
        
    });
  };
  onRadioChangeEventType = (e) => {
    this.setState({
        eventType : parseInt(e.target.value),
        
    });
  }; 
   onRadioChangeEventVisibility = (e) => {
    this.setState({
        eventVisibility: parseInt(e.target.value),
        
    });
  };
  render() {
    return (
      <div class="backgroundimg">
        <div className="container">
          <Grid className="card" style={{ width: "50%" }}>
            <Grid.Column width={16}>
              <Grid stackable style={{ justifyContent: "center" }}>
                <Grid.Row>
                  <Grid.Column>
                    <Header className="htn">Create Event</Header>
                    <Form onSubmit={this.handleRegister}>
                      <Form.Field>
                        <input
                          className="regis_input_type2"
                          name="eventTitle"
                          type="text"
                          placeholder="eventTitle"
                          style={{ width: "100%" }}
                          value={this.state.eventTitle}
                          onChange={this.handleInputChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <input
                          className="regis_input_type2"
                          name="eventDetails"
                          type="text"
                          placeholder=" Details of event"
                          style={{ width: "100%" }}
                          value={this.state.eventDetails}
                          onChange={this.handleInputChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <input
                          name="eventLocation"
                          className="regis_input_type2"
                          placeholder=" Location of event"
                          style={{ width: "100%" }}
                          type="text"
                          value={this.state.eventLocation}
                          onChange={this.handleInputChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <input
                          name="eventDate"
                          className="regis_input_type2"
                          placeholder="Event Date"
                          style={{ width: "100%" }}
                          type="text"
                          value={this.state.eventDate}
                          onChange={this.handleInputChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label class="radio">
                          <input
                            type="radio"
                            checked={this.state.ticketPrice === 0}
                            onChange={this.onRadioChangeTicketPrice}
                            value="0"
                          />
                          Ticeket Event
                        </label>
                        <label class="radio">
                          <input
                            type="radio"
                            checked={this.state.ticketPrice === 1}
                            onChange={this.onRadioChangeTicketPrice}
                            value="1"
                          />
                          Free Event
                        </label>
                      </Form.Field>
                      {/* //event type */}
                      <Form.Field>
                        <label class="radio">
                          <input
                            type="radio"
                            checked={this.state.eventType === 0}
                            onChange={this.onRadioChangeEventType}
                            value="0"
                          />
                          Meetup
                        </label>
                        <label class="radio">
                          <input
                            type="radio"
                            checked={this.state.eventType === 1}
                            onChange={this.onRadioChangeEventType}
                            value="1"
                          />
                          Study
                        </label>
                        <label class="radio">
                          <input
                            type="radio"
                            checked={this.state.eventType === 2}
                            onChange={this.onRadioChangeEventType}
                            value="2"
                          />
                          Party
                        </label>
                        <label class="radio">
                          <input
                            type="radio"
                            checked={this.state.eventType === 3}
                            onChange={this.onRadioChangeEventType}
                            value="3"
                          />
                          Special Event
                        </label>
                      </Form.Field>
                      <Form.Field>
                        <label class="radio">
                          <input
                            type="radio"
                            checked={this.state.eventVisibility === 0}
                            onChange={this.onRadioChangeEventVisibility}
                            value="0"
                          />
                         Public
                        </label>
                        <label class="radio">
                          <input
                            type="radio"
                            checked={this.state.eventVisibility === 1}
                            onChange={this.onRadioChangeEventVisibility}
                            value="1"
                          />
                         Private
                        </label>
                      </Form.Field>
                      {/* //create event */}
                      <Form.Field>
                        <Button
                          className="btn_submit"
                          type="submit"
                          disabled={this.emptyFields()}
                        >
                          Create Event
                        </Button>
                      </Form.Field>
                      
                      <Form.Field>
                        <div class="has-text-danger">
                          {this.state.RegistrationSuccessful == false && (
                            <h1>{this.state.registrationMessage}</h1>
                          )}
                        </div>
                      </Form.Field>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateEvent);
