import React, { Component } from 'react';

export default class Profile extends Component {
  componentDidMount = () => {
    console.log(this.props);
  }
  handleMessage = () => {
    this.props.handleMessage(false, 'The sky has fallen')
  }
  render() {
    return (
      <div>
        <h3>Profile page</h3>
        <button onClick={this.handleMessage} className='ui button'>Click Me!</button>
      </div>
    );
  }
}
