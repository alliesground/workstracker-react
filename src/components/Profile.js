import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import { 
  actions as flashMessageActions,
  selectors as flashMessageSelectors 
} from '../ducks/flash_message';

export default class Profile extends Component {
  render() {
    return (
      <div>
        <h3>Profile page</h3>
      </div>
    );
  }
}
