import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { client } from '../Client';
import { actions } from '../ducks/auth';
import { connect } from 'react-redux';

class Logout extends Component {
  constructor(props) {
    super(props);
    //client.logout();
    this.props.logout();
  }

  render() {
    return (
      <Redirect
        to='/login'
      />
    );
  }
}

const mapStateToProps = () => ({})
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
