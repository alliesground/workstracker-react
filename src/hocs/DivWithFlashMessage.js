import React, { Component } from 'react';
import Message from '../components/Message';

export default class DivWithFlashMessage extends Component {
  state = {
    hasMessage: false,
    message: 'Something went wrong'
  }

  handleMessage = (hasMessage, message) => {
    this.setState({
      hasMessage: hasMessage,
      message: message
    });
  }

  render() {
    const children = this.props.children;
    const childrenWithProps = React.Children.map(children, (child) => 
      React.cloneElement(child,  { handleMessage: this.handleMessage } )
    );

    return(
      <div>
        <div className='row'>
          {this.state.hasMessage && <Message message={this.state.message} />}
        </div>
        {childrenWithProps}
      </div>
    );
  }
}
