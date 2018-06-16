import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectors, actions } from '../ducks/projects/index';
import { Redirect } from 'react-router-dom';

class Project extends Component {
  constructor (props) {
    super(props);
    this.projectId = this.props.match.params.projectId;
  }

  componentDidMount() {
    if (!this.isProjectPresentLocally()) {
      return this.props.fetchProject(this.projectId);
    }
  }

  componentWillUnmount() {
    this.props.setShouldRedirect(false);
  }

  isProjectPresentLocally = () => {
    this.project = this.props.projects.find(
      (p) => p.id === this.projectId
    );

    return this.project;
  }

  render() {
    if (this.props.isFetching) {
      return (
        <div className='ui active centered inline loader' />
      );
    }
    else if (this.props.shouldRedirect) { 
      return <Redirect to='/' />
    }
    else if (this.isProjectPresentLocally()) {
      return (
        <div>
          <h2>Your Project: {this.project.attributes.title}</h2>
        </div>
      );
    }
    else {return null}
  }
}

const mapStateToProps = (state) => ({
  projects: selectors.getProjects(state.projects),
  isFetching: selectors.getIsFetching(state.projects),
  shouldRedirect: state.projects.shouldRedirect
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: (id) => (
      dispatch(actions.fetchProject(id))
    ),
    setShouldRedirect: (bool) => (
      dispatch(actions.setShouldRedirect(bool))
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);

