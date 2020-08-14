import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

import './App.css';
import Login from './Login/Login';
import Nav from './Shared/SharedComponents';
import homePage from './HomePage/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
        <Route path = '/login' component={Login}/>
        <Route path='/' component={homePage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;