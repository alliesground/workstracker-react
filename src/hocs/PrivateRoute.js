import React, { Component } from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import { client } from '../Client';
import withMergedProps from './WithMergedProps';

const PrivateRoute = ({ component, isLoggedIn, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      return isLoggedIn ? ( 
        withMergedProps(component, props, rest)
      ) : (
        <Redirect to={{pathname: '/login'}} />
      )
    }} />
  );
};

export default PrivateRoute;

