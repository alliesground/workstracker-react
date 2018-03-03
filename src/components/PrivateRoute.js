import React, { Component } from 'react';
import { 
  Route,
  Redirect
} from 'react-router-dom';
import { client } from '../Client';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
};

const PrivateRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      return client.isLoggedIn() ? (
        renderMergedProps(component, props, rest)
      ) : (
        <Redirect to={{pathname: '/login'}} />
      )
    }} />
  );
};

export default PrivateRoute;
