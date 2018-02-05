import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApiClient from './ApiClient';
import Project from './Project';

class App extends Component {
  state = {
    projects:[]
  }

  componentWillMount() {
    ApiClient.loadProjects((projects) => {
      this.setState({ projects: projects });
    })
    .catch((err) => {
      console.error(err);
    });
  }


  render() {
    const projects = this.state.projects.map((project) => (
      <Project 
        title={project.title}
        key={project.id}
      />
      ));
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {projects}
      </div>
    );
  }
}

export default App;
