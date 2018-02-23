import React, { Component } from 'react';
import ApiClient from './ApiClient';
import { client } from './Client';
import { 
  Link,
  Route
} from 'react-router-dom';
import Project from './Project';
import ProjectListMenu from './ProjectListMenu';

export default class ProjectsContainer extends Component {
  state = {
    fetched: false,
    projects: []
  };

  componentDidMount() {
    this.getProjects();
  }

  getProjects = () => {
    ApiClient.loadProjects((projects) => {
      this.setState({
        fetched: true,
        projects: projects,
      });
    });
  }

  render() {
    if(!this.state.fetched) {
      return (
        <div className='ui active centered inline loader' />
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
