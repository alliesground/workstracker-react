import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import { 
  actions as flashMessageActions,
  selectors as flashMessageSelectors 
} from '../ducks/flash_message';

class Profile extends Component {
  componentWillUnmount = () => {
    this.props.resetFlashMessage();
  }
  setMessage = () => {
    this.props.setFlashMessage('Flashedddd');
  }
  render() {
    return (
      <div>
        <h3>Profile page</h3>
        <button 
          type='button'
          onClick={this.setMessage}
        >
          Error!
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    flashMessage: flashMessageSelectors.getFlashMessage(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFlashMessage: (message) => (
      dispatch(flashMessageActions.setFlashMessage(message))
    ),
    resetFlashMessage: () => (
      dispatch(flashMessageActions.resetFlashMessage())
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
