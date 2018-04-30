import React, { Component } from 'react'
import ProjectForm from './ProjectForm'
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { actions } from '../ducks/projects/index';

class ToggleableProjectForm extends Component {
  state = {
    isOpen: false
  }

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  }

  handleFormClose = (e) => {
    e.preventDefault();
    this.setState({ isOpen: false });
  }

  handleSubmit = (project) => {
    const project_payload = Object.assign({}, {
      data: {
        type: 'projects',
        attributes: {
          title: project.title,
          description: project.description
        }
      }
    });

    return this.props.createProject(project_payload)
      .then(() => {
        this.setState({ isOpen: false })
      })
      .catch(error => {
        console.log('Error', error);
        throw new SubmissionError({
          ...error,
          _error: 'Project creation failed!'
        })
      });
  }

  render() {
    if (this.state.isOpen) {
      return (
        <ProjectForm
          onSubmit={this.handleSubmit}
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

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => (
      dispatch(actions.createProject(project))
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ToggleableProjectForm);
