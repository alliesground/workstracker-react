import React, { Component } from 'react';
import { client } from '../Client';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../ducks/auth';
import { 
  actions as flashMessageActions
} from '../ducks/flash_message';

import Message from '../components/Message';

class Login extends Component {
  state = {
    fields: {
      email: '',
      password: ''
    }
  }

  componentWillUnmount = () => {
    this.props.resetFlashMessage();
    this.props.resetShouldRedirect();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.login(
      this.state.fields.email, 
      this.state.fields.password
    );
  }

  handleFormInputChange = (e) => {
    const fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  }

  render() {
    if (this.props.shouldRedirect) {
      return (
        <Redirect to='/projects' />
      );
    } else {
      return (
        <div className='ui one column centered grid'>
          <div className='ten wide column'>
            <div className='ui raised very padded text container segment'>
              <h2 className='ui green header'>Login</h2>
              {
                this.props.loginProgress ? (
                  <div 
                    className='ui active centered inline loader'
                  />
                ) : (
                  <form onSubmit={this.handleFormSubmit}>
                    <input
                      type='email'
                      name='email'
                      placeholder='Email'
                      value={this.state.fields.email}
                      onChange={this.handleFormInputChange}
                    />

                    <input
                      type='password'
                      name='password'
                      placeholder='Password'
                      value={this.state.fields.password}
                      onChange={this.handleFormInputChange}
                    />

                    <input
                      type='submit'
                      className='ui large green submit button'
                    />
                  </form>
                )
              }
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    shouldRedirect: state.auth.shouldRedirect,
    loginProgress: state.auth.loginProgress
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => (
      dispatch(actions.login(email, password))
    ),
    resetFlashMessage: () => (
      dispatch(flashMessageActions.resetFlashMessage())
    ),
    resetShouldRedirect: () => (
      dispatch(actions.resetShouldRedirect())
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

