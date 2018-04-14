import React, { Component } from 'react'
import ProjectForm from './ProjectForm'

export default class ToggleableProjectForm extends Component {
  state = {
    isOpen: false
  }

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  }

  handleFormClose = () => {
    this.setState({ isOpen: false });
  }

  handleFormSubmit = (project) => {
    this.props.onFormSubmit(project)
    this.setState({ isOpen: false })
  }

  render() {
    if (this.state.isOpen) {
      return (
        <ProjectForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <div className='row'>
          <button
            className='ui basic button icon'
            onClick={this.handleFormOpen}
          >
            <i className='plus icon' />
          </button>
        </div>
      );
    }
  }
}
