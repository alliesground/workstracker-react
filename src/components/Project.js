import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectors, actions } from '../ducks/projects/index';
import { selectors as usersByIdSelectors } from '../ducks/users/byId';
import { Redirect } from 'react-router-dom';
import MemberList from './MemberList';

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

          <MemberList 
            members={
              this.props.members(this.projectId)
            }
          />
        </div>
      );
    }
    else {return null}
  }
}

const mapStateToProps = (state) => ({
  projects: selectors.getProjects(state.projects),
  isFetching: selectors.getIsFetching(state.projects),
  shouldRedirect: state.projects.shouldRedirect,
  members: (pId) => {
    const memberIds = selectors.getMemberIds(pId, state.projects);

    return memberIds.map(id => usersByIdSelectors.getUser(state.users.byId, id));
  }
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

