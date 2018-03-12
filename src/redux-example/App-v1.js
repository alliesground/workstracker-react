import React, { Component } from 'react';
import { createStore } from 'redux';
import uuid from 'uuid';

const reducer = (state, action) => {
  if (action.type === 'ADD') {
    return {
      names: state.names.concat(action.value)
    };
  } else {
    return state;
  }
}

const initialState = {names:['sameer','dameer', 'mameer']};

const store = createStore(reducer, initialState);

class App extends Component {
  render() {
    const names = store.getState().names;

    return (
      <Names names={names}/>
    );
  }
}

class Names extends Component {
  render() {
    const names = this.props.names.map((name) => (
      <div>
        <p>{name}</p>
      </div>
    ));

    return (
      <div className='ui comments'>
        {names}
      </div>
    );
  }
}

export default App;
