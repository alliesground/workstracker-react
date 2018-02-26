import React, { Component } from 'react';
import { client } from '../Client';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  state = {
    fields: {
      email: '',
      password: ''
    },
    loginProgress: false,
    shouldRedirect: false,
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ loginProgress: true });
    client.login(this.state.fields.email, this.state.fields.password)
      .then(() => (
        this.setState({ 
          shouldRedirect: true,
          fields: {
            email: '',
            password: ''
          }
        })
      ));
  };

  handleFormInputChange = (e) => {
    const fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  };

  render() {
    if (this.state.shouldRedirect) {
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
                this.state.loginInProgress ? (
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
