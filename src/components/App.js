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
import Message from './Message';

class App extends Component {
  state = {
    hasMessage: false,
    message: null
  };

  handleMessage = (message) => {
    this.setState({
      hasMessage: true,
      message: message
    });
  }

  render() {
    return (
      <div className='ui grid container'>
        <TopBar />
        <div className='spacer row' />
        { 
          this.state.hasMessage ? (
            <div className='row'>
              <Message 
                message={this.state.message}
              />
            </div>
          ) : (
            false
          )
        }
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
              handleMessage={this.handleMessage}
            />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
