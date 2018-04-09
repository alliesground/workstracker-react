import React from 'react';

const Project = (props) => (
  <div>
    <h2>Your Project: {props.project.attributes.title}</h2>
  </div>
)

export default Project
