import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import withMergedProps from './WithMergedProps';

const RouteWithProps = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
      withMergedProps(component, props, rest)
    )} 
  />
);

export default RouteWithProps;
  
