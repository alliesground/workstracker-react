import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as flashMessageActions } from '../ducks/flash_message';

class Message extends Component {
  componentWillUnmount = () => {
    console.log('Message Component');
    this.props.resetFlashMessage();
  }

  render() {
    return(
      <div className='ui floating negative message'>
        <h3>
          {this.props.message}
        </h3>
      </div>
    );
  }
}

//export default Message;

const mapDispatchToProps = (dispatch) => {
  return {
    resetFlashMessage: () => (
      dispatch(flashMessageActions.resetFlashMessage())
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Message);
