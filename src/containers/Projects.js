import React, { Component } from 'react';
import ApiClient from '../ApiClient';
import { client } from '../Client';
import {
  Link,
  Route
} from 'react-router-dom';
import Project from '../components/Project';
import ProjectList from '../components/ProjectList';
import { connect } from 'react-redux';
import { actions, selectors } from '../ducks/projects/index';
import ToggleableProjectForm from '../containers/ToggleableProjectForm';
import { SubmissionError } from 'redux-form';
import Message from '../components/Message';
import {
  selectors as flashMessageSelectors,
  actions as flashMessageActions
} from '../ducks/flash_message';

class Projects extends Component { 

  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    if(this.props.isFetching) {
      return (
        <div className='ui active centered inline loader' />
      );
    } else {

      const matchPath = this.props.match.path;

      return (
        <div className='ui six wide column'>
          <ProjectList
            projects={this.props.projects}
            projectsPath={matchPath}
          />

          <ToggleableProjectForm />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    projects: selectors.getProjects(state.projects),
    isFetching: selectors.getIsFetching(state.projects),
    flashMessage: flashMessageSelectors.getFlashMessage(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: () => (
      dispatch(actions.fetchProjects())
    ),
    resetFlashMessage: () => (
      dispatch(flashMessageActions.resetFlashMessage())
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);

