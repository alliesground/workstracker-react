import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import {client} from '../Client';
import ProjectsContainer from './ProjectsContainer';
import TopBar from './TopBar';
import Login from './Login';
import Logout from './Logout';
import PrivateRoute from './PrivateRoute';

const App = () => (
  <div className='ui grid container'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <Switch>
        <Route
          exact path='/' 
          render={() => {
            return (
              <div>
                <h2>Home page</h2>
              </div>
            );
          }} 
        />

        <PrivateRoute
          path='/projects'
          component={ProjectsContainer} 
        />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
      </Switch>
    </div>
  </div>
);

export default App;
