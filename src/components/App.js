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
import PrivateRoute from '../hocs/PrivateRoute';
import PrivateRouteContainer from '../containers/PrivateRouteContainer';
import Profile from './Profile';
import RouteWithProps from '../hocs/RouteWithProps';
import { connect } from 'react-redux';
import { selectors as flashMessageSelectors } from '../ducks/flash_message';
import Message from './Message';

class App extends Component {
  render() {
    return (
      <div className='ui grid container'>
        <TopBar />
        <div className='spacer row' />
        <div className='sixteen wide column'>
          {
            this.props.flashMessage ? (
              <Message message={this.props.flashMessage} />
            ) : (
              null
            )
          }
        </div>
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

            <PrivateRouteContainer
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

const mapStateToProps = (state) => {
  return {
    flashMessage: flashMessageSelectors.getFlashMessage(state)
  }
}

export default withRouter(connect(
  mapStateToProps,
  null
)(App))
