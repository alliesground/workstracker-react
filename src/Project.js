import React, { Component } from 'react';

export default class Project extends Component {
  render() {
    return (
      <div>
        <h2>Your Project: {this.props.project.title}</h2>
      </div>
    );
  }
}
