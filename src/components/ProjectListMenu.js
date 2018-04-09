import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const ProjectListMenu = ({ projects, projectsPath }) => (
  <div className='ui secondary vertical menu'>
    <div className='header item'>
      Projects
    </div>
    {
      projects.map((project) => (
        <NavLink
          to={`${projectsPath}/${project.id}`}
          className='item'
          key={project.id}
        >
          {project.attributes.title}
        </NavLink>
      ))
    }
  </div>
);

export default ProjectListMenu;
