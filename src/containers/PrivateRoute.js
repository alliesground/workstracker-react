import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import withMergedProps from '../hocs/WithMergedProps';
import { actions as flashMessageActions } from '../ducks/flash_message';
import PrivateRoute from '../hocs/PrivateRoute'

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
}

export default connect(
  mapStateToProps
)(PrivateRoute);
