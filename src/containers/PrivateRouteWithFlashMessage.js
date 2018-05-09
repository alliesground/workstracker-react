import React, { Component } from 'react';
import PrivateRoute from '../hocs/PrivateRoute';
import { connect } from 'react-redux';
import { client } from '../Client';
import { actions as authActions } from '../ducks/auth';
import { actions as flashMessageActions } from '../ducks/flash_message';

class PrivateRouteWithFlashMessage extends Component {

  componentDidMount = () => {
    let message = null;

    if (client.isTokenExpired()) {
      message = 'Your Token expired. Please login again';
    }

    if (!client.token) {
      message = 'Please login first';
    }

    if (!client.isLoggedIn()) {
      client.removeToken();
      this.props.setShouldRedirect(false);
      this.props.setFlashMessage(message);
    }
  }

  render() {
    return (
      <PrivateRoute
        component={this.props.component}
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFlashMessage: (message) => (
      dispatch(flashMessageActions.setFlashMessage(message))
    ),
    setShouldRedirect: (bool) => ( 
      dispatch(authActions.setShouldRedirect(bool))
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PrivateRouteWithFlashMessage);

