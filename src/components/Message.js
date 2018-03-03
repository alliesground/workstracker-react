import React, { Component } from 'react';

const Message = (props) => (
  <div className='ui inverted red segment'>
    <h3>
      Error! {props.message}
    </h3>
  </div>
)

export default Message;
