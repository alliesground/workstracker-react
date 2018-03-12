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
    const threadIndex = state.threads.findIndex((t) => (
      t.id === action.threadId
    ));
    const oldThread = state.threads[threadIndex];
    const newThread = {
      ...oldThread,
      messages: oldThread.messages.concat(newMessage)
    }
    return {
      ...state,
      threads: [
        ...state.threads.slice(0, threadIndex),
        newThread,
        ...state.threads.slice(threadIndex + 1, state.threads.length)
      ]
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    const threadIndex = state.threads.findIndex((t) => (
      t.messages.find((m) => (
        m.id === action.id
      ))
    ));

    const oldThread = state.threads[threadIndex];
    const newThread = {
      ...oldThread,
      messages: oldThread.messages.filter((m) => (
        m.id !== action.id
      ))
    }

    return {
      ...state,
      threads: [
        ...state.threads.slice(0, threadIndex),
        newThread,
        ...state.threads.slice(threadIndex + 1, state.threads.length) 
      ]
    };
  } else if (action.type === 'OPEN_THREAD') {
    return {
      ...state,
      activeThreadId: action.threadId
    }
  }
  else {
    return state;
  }
}

const initialState = {
  activeThreadId: '1-fca2',
  threads: [
    {
      id: '1-fca2',
      title: 'Comms',
      messages: [
        {
          id: uuid.v4(),
          text: 'Twelve minutes to ignition',
          timestamp: Date.now(),
        }
      ]
    },
    {
      id: '2-be91',
      title: 'Maintainence',
      messages: [
        {
          id: uuid.v4(),
          text: 'Basant',
          timestamp: Date.now()
        }
      ]
    }
  ]
};

const store = createStore(reducer, initialState);

class App extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState();
    const activeThreadId = state.activeThreadId;
    const threads = state.threads
    const activeThread = threads.find((t) => t.id === activeThreadId);
    const tabs = threads.map(t => (
      {
        title: t.title,
        active: t.id === activeThreadId,
        threadId: t.id
      }
    ));

    return (
      <div className='ui segment'>
        <ThreadTabs tabs={tabs} />
        <Thread thread={activeThread} />
      </div>
    );
  }
}

/* ThreadTabs */
class ThreadTabs extends Component {
  handleClick = (threadId) => {
    store.dispatch({
      type: 'OPEN_THREAD',
      threadId: threadId
    })
  }

  render() {
    const tabs = this.props.tabs.map((tab, idx) => (
      <div
        key={idx}
        className = {tab.active ? 'active item' : 'item'}
        onClick={() => this.handleClick(tab.threadId)}
      >
        {tab.title}
      </div>
    ));

    return (
      <div className='ui top attached tabular menu'>
        {tabs}
      </div>
    );
  }
}

/* Thread */
class Thread extends Component {
  handleClick = (id) => {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      id: id
    });
  }

  render() {
    const messages = this.props.thread.messages.map((message, index) => (
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
      <div>
        <h1>{this.props.thread.title}</h1>
        <div className='ui comments'>
          {messages}
        </div>
        <MessageInput threadId={this.props.thread.id}/>
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
      threadId: this.props.threadId
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

export default App;
