import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getToken, getUserID } from './JwtConfig';

class AuthenticationGuard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const jwt = getUserID();
    if (!jwt) {
      this.props.history.push('/login');
    } else {
        this.props.history.push('/homePage');
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(AuthenticationGuard);