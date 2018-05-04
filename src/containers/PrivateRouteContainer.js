import React, { Component } from 'react';
import PrivateRoute from '../hocs/PrivateRoute';
import { connect } from 'react-redux';
import { actions as authActions } from '../ducks/auth';

class PrivateRouteContainer extends Component {
  componentDidMount = () => {
    console.log('Private Container');
    this.props.authenticate();
  }

  render() {
    console.log('Rendering')
    return (
      <PrivateRoute
        component={this.props.component}
        isLoggedIn={this.props.isLoggedIn}
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => (
      dispatch(authActions.authenticate())
    )
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRouteContainer);

