import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react';
import ProjectForm from './ProjectForm'
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { actions } from '../ducks/projects/index';

class ToggleableProjectForm extends Component { 
  state = { modalOpen: false }
  handleFormOpen = () => this.setState({ modalOpen: true });
  handleFormClose = () => this.setState({ modalOpen: false });

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
        this.handleFormClose();
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
    return (
      <Modal 
        trigger={<Button onClick={this.handleFormOpen}>Create New Project</Button>} 
        open={this.state.modalOpen}
        onClose={this.handleFormClose}
        size='mini'
      >
        <Modal.Content>
          <ProjectForm
            onSubmit={this.handleSubmit}
            onFormClose={this.handleFormClose}
          />
        </Modal.Content>
      </Modal>
    );
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
