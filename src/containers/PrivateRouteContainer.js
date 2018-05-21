import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import withMergedProps from '../hocs/WithMergedProps';
import { actions as flashMessageActions } from '../ducks/flash_message';

const PrivateRouteContainer = (props) => {
  const { dispatch, isLoggedIn, component, ...rest } = props;

  if (isLoggedIn) {
    return (
      <Route {...rest} render={props => {
        return withMergedProps(component, props, rest)
      }} />
    );
  }

  return <Redirect to={{pathname: '/login'}} />
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
}

export default connect(
  mapStateToProps,
  null
)(PrivateRouteContainer);
