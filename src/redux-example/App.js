import React, { Component } from 'react';
import { createStore } from 'redux';
import uuid from 'uuid';

const reducer = (state, action) => {
  if(action.type === 'ADD_MESSAGE') {
    const newMessage = {
      text: action.text,
      timestamp: Date.now(),
      id: uuid.v4(),
    };
    return {
      messages: state.messages.concat(newMessage)
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages: state.messages.filter((m) => (
        m.id !== action.id
      ))
    };
  } else {
    return state;
  }
}

const initialState = {
  messages: [
    {
      text: 'Roger. Eagle is undocked',
      timestamp: Date.now(),
      id: uuid.v4()
    }
  ]
};

const store = createStore(reducer, initialState);

class App extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const messages = store.getState().messages;

    return (
      <div>
        <MessageView messages={messages} />
        <MessageInput />
      </div>
    );
  }
}

/* MessageInput */
class MessageInput extends Component {
  state = {
    value: ''
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit = () => {
    store.dispatch({
      type: 'ADD_MESSAGE',
      text: this.state.value,
    });
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <div>
        <div className='ui input'>
          <input
            onChange={this.onChange}
            value={this.state.value}
            type='text'
          >
          </input>
          <button
            onClick={this.handleSubmit}
            className='ui primary button'
            type='submit'
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

/* MessageView */
class MessageView extends Component {
  handleClick = (id) => {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      id: id
    });
  }

  render() {
    const messages = this.props.messages.map((message, index) => (
      <div
        className='comment'
        key={index}
        onClick={() => this.handleClick(message.id)}
      >
        <div className='text'>
          {message.text}
          <span className='metadata'>{message.timestamp}</span>
        </div>
      </div>
    ));

    return (
      <div className='ui comments'>
        {messages}
      </div>
    );
  }
}



export default App;
