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
  render() {
    return (
      <div>
        <h3>Profile page</h3>
      </div>
    );
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
  null,
  mapDispatchToProps
)(Profile);
