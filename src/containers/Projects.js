import React, { Component } from 'react';
import ApiClient from '../ApiClient';
import { client } from '../Client';
import { 
  Link,
  Route
} from 'react-router-dom';
import Project from '../components/Project';
import ProjectListMenu from '../components/ProjectListMenu';
import { connect } from 'react-redux';
import { actions, selectors } from '../ducks/projects/index';
import ToggleableProjectForm from '../containers/ToggleableProjectForm'
import { SubmissionError } from 'redux-form';

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
        <div className='ui two column divided grid'>
          <div className='ui six wide column'>
            <ProjectListMenu
              projects={this.props.projects}
              projectsPath={matchPath}
            />

            <ToggleableProjectForm />
          </div>

          <div className='ui ten wide column'>
            <Route
              path={`${matchPath}/:projectId`}
              render={({ match }) => {
                const project = this.props.projects.find(
                  (p) => p.id == match.params.projectId
                );

                return (
                  <Project
                    project={project}
                  />
                );
              }}
            />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    projects: selectors.getProjects(state.projects),
    isFetching: selectors.getIsFetching(state.projects)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: () => (
      dispatch(actions.fetchProjects())
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);

