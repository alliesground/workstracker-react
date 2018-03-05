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
import Profile from './Profile';
import RouteWithProps from './RouteWithProps';

class DivWithFlashMessage extends Component {
  state = {
    hasMessage: false,
    message: 'Something went wrong'
  }

  handleMessage = (hasMessage, message) => {
    this.setState({
      hasMessage: hasMessage,
      message: message
    });
  }

  render() {
    const children = this.props.children;
    const childrenWithProps = React.Children.map(children, (child) => 
      React.cloneElement(child,  { handleMessage: this.handleMessage } )
    );

    return(
      <div>
        <div className='row'>
          {this.state.hasMessage && <Message message={this.state.message} />}
        </div>
        {childrenWithProps}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className='ui grid container'>
        <TopBar />
        <div className='spacer row' />
        <div className='row'>
          <Switch>
            <DivWithFlashMessage>
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
              <RouteWithProps path='/profile' component={Profile} />
            </DivWithFlashMessage>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
