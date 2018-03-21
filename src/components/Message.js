import React, { Component } from 'react';

const Message = ({ message }) => (
  <div className='ui inverted red segment'>
    <h3>
      {message}
    </h3>
  </div>
)

export default Message;
