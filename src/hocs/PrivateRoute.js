import React, { Component } from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import { client } from '../Client';
import withMergedProps from './WithMergedProps';
import { connect } from 'react-redux';

const PrivateRoute = ({ isLoggedIn, component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      console.log('Private route is loggedin: ', isLoggedIn)
      return isLoggedIn ? ( 
        withMergedProps(component, props, rest)
      ) : (
        <Redirect to={{pathname: '/login'}} />
      )
    }} />
  );
};

//export default PrivateRoute;

const mapStateToProps = (state) => {
  return {
  isLoggedIn: state.auth.isLoggedIn
  }
}

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);


