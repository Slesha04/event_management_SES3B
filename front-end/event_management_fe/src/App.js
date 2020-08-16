import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

import './App.css';
import Login from './Login/Login';
import Nav from './Shared/SharedComponents';
import homePage from './HomePage/HomePage';
import Registration from './Login/Registration';
import CreateEvent from './Events/CreateEvent';
import EditEvent from './Events/EditEvent';
import Ticket from './Events/Ticket';
import EventConfirmation from './Events/EventConformation';
import GlobalChat from './Chats/GlobalChat';
import EventChat from './Chats/EventChat';
import Profile from './Profile/Profile';
import AllEvents from './Events/Allevents';

function App() {
  return (
    <Router>
      <div className="App">
      <Nav/>
        <Switch>
          <Route path = '/login' component={Login}/>
          <Route path='/rego' component={Registration}/>
          <Route path='/' exact component={homePage}/>
          <Route path='/create-event' component={CreateEvent}/>
          <Route path='/edit-event' component={EditEvent}/>
          <Route path='/ticket' component={Ticket}/>
          <Route path='/event-confirmation' component={EventConfirmation}/>
          <Route path='/global-chat' component={GlobalChat}/>
          <Route path='/event-chat' component={EventChat}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/all-events' component={AllEvents}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;