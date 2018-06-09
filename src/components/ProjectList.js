import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Card } from 'semantic-ui-react'

const ProjectList = ({ projects, projectsPath }) => (
  <div>
    {
      projects.map((project) => (
          <NavLink
            to={`${projectsPath}/${project.id}`}
            key={project.id}
          >
            <Card 
              header={project.attributes.title}
            />
          </NavLink>
        )
      )
    }
  </div>
);

export default ProjectList;
