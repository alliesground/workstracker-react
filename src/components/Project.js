import React from 'react';
import { connect } from 'react-redux';
import { selectors as projectsSelectors } from '../ducks/projects/index';

const Project = (props) => {
  const project = props.projects.find(
    (p) => p.id == props.match.params.projectId
  );

  return(
    <div>
      <h2>Your Project: {project.attributes.title}</h2>
    </div>
  );
}

const mapStateToProps = (state) => ({
  projects: projectsSelectors.getProjects(state.projects)
})

export default connect(
  mapStateToProps,
  null
)(Project);

