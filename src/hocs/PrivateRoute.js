import React, { Component } from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import { client } from '../Client';
import withMergedProps from './WithMergedProps';

const PrivateRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      console.log('LoggedIn?',client.isLoggedIn());
      return client.isLoggedIn() ? (
        withMergedProps(component, props, rest)
      ) : (
        <Redirect to={{pathname: '/login'}} />
      )
    }} />
  );
};

export default PrivateRoute;
