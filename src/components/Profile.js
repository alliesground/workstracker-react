import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import { 
  actions as flashMessageActions,
  selectors as flashMessageSelectors 
} from '../ducks/flash_message';
import { actions as authActions } from '../ducks/auth';
import { client } from '../Client';

class Profile extends Component {
  handleLogout = () => {
    client.logout();
    this.props.logout();
  }

  render() {
    return (
      <div>
        <h3>Profile page</h3>
        <p
          onClick={this.handleLogout}
        >click me</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(authActions.logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
