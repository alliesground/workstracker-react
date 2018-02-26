import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import ApiClient from '../ApiClient';
import {client} from '../Client';
import ProjectsContainer from './ProjectsContainer';
import TopBar from './TopBar';
import Login from './Login';
import Logout from './Logout';

const PrivateRoute = ({component, ...rest}) => (
  <Route {...rest} render={(props) => (
    client.isLoggedIn() ? (
      React.createElement(component, props)
      ) : (
      window.location.assign('http://localhost:3001/users/sign_in')
      )
  )} />
); 

/*
const Profile = (props) => (
  <div className='equal width row'>
    <div className='column'>
      <h2 className='ui text center header'>
        Welcome to WroksTracker
      </h2>
    </div>
    <div className='column'>
      Hello world
    </div>
  </div>
);*/

const App = () => (
  <div className='ui grid container'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <Route exact path='/login' component={Login} />
      <Route exact path='/logout' component={Logout} />
      <Route path='/projects' component={ProjectsContainer} />
    </div>
  </div>
);

export default App;
