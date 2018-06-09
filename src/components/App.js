import React, { Component } from 'react';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import {client} from '../Client';
import Projects from '../containers/Projects';
import TopBar from './TopBar';
import Login from '../containers/Login';
import Logout from '../containers/Logout';
import Profile from './Profile';
import RouteWithProps from '../hocs/RouteWithProps';
import { connect } from 'react-redux';
import { selectors as flashMessageSelectors } from '../ducks/flash_message';
import Message from './Message';
import PrivateRoute from '../containers/PrivateRoute';
import Project from '../components/Project';

class App extends Component {
  render() {
    return (
      <div className='ui grid container'>
        <TopBar />
        <div className='spacer row' />
        {
          this.props.flashMessage ? (
            <Message message={this.props.flashMessage} />
          ) : (
            null
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
              exact
              path='/projects'
              component={Projects}
            />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/profile' component={Profile} />
            <Route
              path={'/projects/:projectId'}
              component={Project}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    flashMessage: flashMessageSelectors.getFlashMessage(state)
  }
}

export default withRouter(connect(
  mapStateToProps,
  null
)(App))
