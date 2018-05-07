import React, { Component } from 'react';
import PrivateRoute from '../hocs/PrivateRoute';
import { connect } from 'react-redux';
import { actions as authActions } from '../ducks/auth';
import { client } from '../Client';

class PrivateRouteContainer extends Component {
  componentDidMount = () => {
    console.log('PrivateContainer did mount');
    if(client.isLoggedIn()) {
      this.props.handleAuthenticUser();
    } else {
      this.props.handleUnauthenticUser();
    }
    //this.props.authenticate();
  }

  render() {
    return (
      <PrivateRoute
        component={this.props.component}
        //isLoggedIn={this.props.isLoggedIn}
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => (
      dispatch(authActions.authenticate())
    ),
    handleAuthenticUser: () => (
      dispatch(authActions.handleAuthenticUser())
    ),
    handleUnauthenticUser: () => (
      dispatch(authActions.handleUnauthenticUser())
    )
  }
}
/*const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}*/

export default connect(
  null,
  mapDispatchToProps
)(PrivateRouteContainer);

