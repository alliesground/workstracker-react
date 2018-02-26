import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { client } from '../Client';

export default class Logout extends Component {
  constructor(props) {
    super(props);

    client.logout();
  }

  render() {
    return (
      <Redirect
        to='/login'
      />
    );
  }
}
