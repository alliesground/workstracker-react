import React, { Component } from 'react';
import { Route } from 'react-router-dom';

const withMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);

  return (
    React.createElement(component, finalProps)
  );
}

export default withMergedProps;
