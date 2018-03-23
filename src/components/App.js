import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import {client} from '../Client';
import Projects from '../containers/Projects';
import TopBar from './TopBar';
import Login from '../containers/Login';
import Logout from '../containers/Logout';
import PrivateRoute from '../hocs/PrivateRoute';
import Message from './Message';
import Profile from './Profile';
import RouteWithProps from '../hocs/RouteWithProps';

class App extends Component {
  render() {
    return (
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
              component={Projects}
            />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/profile' component={Profile} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
