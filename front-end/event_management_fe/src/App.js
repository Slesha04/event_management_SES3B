import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import AuthenticationGuard from "./Login/AuthenticationGuard";

import './App.css';
import Login from './Login/Login';
import Navbar from './Shared/Navbar';
import homePage from './HomePage/HomePage';

import Register from './Login/Registration';
import CreateEvent from './Events/CreateEvent';
import EditEvent from './Events/EditEvent';
import Ticket from './Events/Ticket';
import EventConfirmation from './Events/EventConformation';
import GlobalChat from './Chats/GlobalChat';
import EventChat from './Chats/EventChat';
import Profile from './Profile/Profile';
import AllEvents from './Events/Allevents';
import MyEvents from './Events/myEvents';
import viewEvent from './Events/viewEvent';
import EventsGuestList from './Events/EventsGuestList'
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
        <Route path={"/login"} component={Login} />
          <Route path={"/Register"} component={Register} />
          <AuthenticationGuard>
          <Route path='/homePage' exact component={homePage}/>
          <Route path='/CreateEvent' component={CreateEvent}/>
          <Route path='/edit-event' component={EditEvent}/>
          <Route path='/view-event' component={viewEvent}/>
          <Route path='/ticket' component={Ticket}/>
          <Route path='/event-confirmation' component={EventConfirmation}/>
          <Route path='/global-chat' component={GlobalChat}/>
          <Route path='/event-chat' component={EventChat}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/myEvents' component={MyEvents}/>
          <Route path='/all-events' component={AllEvents}/>
          <Route path='/guestList-event' component={EventsGuestList}/>
          </AuthenticationGuard>
        </Switch>
      </div>
    </Router>
  );
}

export default App;