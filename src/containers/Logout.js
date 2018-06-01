import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { client } from '../Client';
import { actions } from '../ducks/auth';
import { connect } from 'react-redux';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.props.logout();
  }

  render() {
    if (!this.props.shouldRedirect) {
      console.log('render logout');
      return (
        <Redirect
          to='/login'
        />
      );
    } else { return null }
  }
}

const mapStateToProps = (state) => ({
  shouldRedirect: state.auth.shouldRedirect
})
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => (
      dispatch(actions.logout())
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
