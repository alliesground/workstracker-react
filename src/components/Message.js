import React, { Component } from 'react';

const Message = (props) => (
  <div className='ui floating negative message'>
    <h3>
      {props.message}
    </h3>
  </div>
)

export default Message;
