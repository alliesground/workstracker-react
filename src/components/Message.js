import React, { Component } from 'react';

const Message = (props) => (
  <div className='sixteen wide column'>
    <div className='ui floating negative message'>
      <h3>
        {props.message}
      </h3>
    </div>
  </div>
)

export default Message;
