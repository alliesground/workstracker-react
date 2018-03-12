import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
import { Provider, connect } from 'react-redux';

const reducer = (state = {}, action) => {
  return {
    activeThreadId: activeThreadIdReducer(state.activeThreadId, action),
    threads: threadsReducer(state.threads, action)
  }
}

/*
const reducer = combineReducers({
  activeThreadId: activeThreadIdReducer,
  threads: threadsReducer,
});*/

const activeThreadIdReducer = (threadId = '1-fca2', action) => {
  if (action.type === 'OPEN_THREAD') {
    return action.threadId;
  } else {
    return threadId;
  }
}

const findThreadIndex = (threads, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      return threads.findIndex(
        (t) => t.id === action.threadId
      );
    }
    case 'DELETE_MESSAGE': {
      return threads.findIndex(
        (t) => t.messages.find((m) => (
          m.id === action.id
        ))
      );
    }
  }
}

const threadsReducer = (threads = [
    {
      id: '1-fca2',
      title: 'Comms',
      messages: messagesReducer(undefined, {})
    },
    {
      id: '2-be91',
      title: 'Maintenance',
      messages: messagesReducer(undefined, {})
    }
  ], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
    case 'DELETE_MESSAGE': {
      const threadIndex = findThreadIndex(threads, action);
      const oldThread = threads[threadIndex];
      const newThread = {
        ...oldThread,
        messages: messagesReducer(oldThread.messages, action)
      };

      return [
        ...threads.slice(0, threadIndex),
        newThread,
        ...threads.slice(threadIndex + 1, threads.length)
      ];
    }
    default: {
      return threads;
    }
  }
}

const messagesReducer = (state = [], action) => {
  if (action.type === 'ADD_MESSAGE') {
    const newMessage = {
      text: action.text,
      timestamp: Date.now(),
      id: uuid.v4()
    };
    return state.concat(newMessage);
  } else if (action.type === 'DELETE_MESSAGE') {
    return state.filter((m) => (
      m.id !== action.id
    ));
  } 
  else {
    return state;
  }
}

const store = createStore(reducer);

const App = () => (
  <div className='ui segment'>
    <ThreadTabs />
    <ThreadDisplay />
  </div>
)

/* ThreadTabs */
class ThreadTabs extends Component {
  componentDidMount = () => {
    store.subscribe(() => this.forceUpdate());
  }

  handleClick = (threadId) => {
    store.dispatch({
      type: 'OPEN_THREAD',
      threadId: threadId
    })
  }

  render() {
    const state = store.getState();
    const tabs = state.threads.map(t => (
      {
        title: t.title,
        active: t.id === state.activeThreadId,
        threadId: t.id
      }
    ));
    
    return (
      <Tabs
        tabs={tabs}
        onClick={this.handleClick}
      />
    );
  }
}

const Tabs = (props) => (
  <div className='ui top attached tabular menu'>
    {
      props.tabs.map((tab, index) => (
        <div
          key={index}
          className={tab.active ? 'active item' : 'item'}
          onClick={() => props.onClick(tab.threadId)}
        >
          {tab.title}
        </div>
      ))
    }
  </div>
)

/* ThreadDisplay */
class ThreadDisplay extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState();
    const activeThreadId = state.activeThreadId;
    const activeThread = state.threads.find(
      t => t.id === activeThreadId
    );

    return (
      <Thread 
        thread={activeThread}
        onMessageClick={(id) => (
          store.dispatch({
            type: 'DELETE_MESSAGE',
            id: id
          })
        )}
        onMessageSubmit={(text) => (
          store.dispatch({
            type: 'ADD_MESSAGE',
            text: text,
            threadId: activeThreadId
          })
        )}
      />
    );
  }
}

/* TextFieldSubmit */
class TextFieldSubmit extends Component {
  state = {
    value: ''
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.value)
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

/* MessageList */
const MessageList = (props) => (
  <div className='ui comments'>
    {
      props.messages.map((m, index) => (
        <div
          className='comment'
          key={index}
          onClick={() => props.onClick(m.id)}
        >
          <div className='text'>
            {m.text}
            <span className='metadata'>{m.timestamp}</span>
          </div>
        </div>
      ))
    }
  </div>
);

const Thread = (props) => (
  <div className='ui center aligned basic segment'>
    <MessageList
      messages={props.thread.messages}
      onClick={props.onMessageClick}
    />
    <TextFieldSubmit
      onSubmit={props.onMessageSubmit}
    />
  </div>
);

export default App;
