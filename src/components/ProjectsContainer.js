import React, { Component } from 'react';
import ApiClient from '../ApiClient';
import { client } from '../Client';
import { 
  Link,
  Route
} from 'react-router-dom';
import Project from './Project';
import ProjectListMenu from './ProjectListMenu';

export default class ProjectsContainer extends Component {
  state = {
    fetched: false,
    projects: [],
    error: false,
    errorMessage: ''
  };

  componentDidMount() {
    this.getProjects();
  }

  getProjects = () => {
    client.getProjects(this.handleSuccess, this.handleError);
  }

  handleSuccess = (projects) => {
    this.setState({
      fetched: true,
      projects: projects
    });
  }

  handleError = (error) => {
    this.setState({
      fetched: true,
      error: true,
      errorMessage: error.status
    });
  }

  render() {
    if(!this.state.fetched) {
      return (
        <div className='ui active centered inline loader' />
      );
    } else if(this.state.error) {
      return (
        <div className='column'>
          <div className='ui negative message'>
            <i className='close icon'></i>
            <div className='header'>
              Error!
            </div>
            <p>{this.state.errorMessage}</p>
          </div>
        </div>
      );
    } else {
      const matchPath = this.props.match.path;
      return (
        <div className='ui two column divided grid'>
          <div className='ui six wide column'>
            <ProjectListMenu 
              projects={this.state.projects}
              projectsPath={matchPath}
            />
          </div>

          <div className='ui ten wide column'>
            <Route
              path={`${matchPath}/:projectId`}
              render={({ match }) => {
                const project = this.state.projects.find(
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
