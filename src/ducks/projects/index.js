import { combineReducers } from 'redux';
import { client } from '../../Client';
import byId, { selectors as byIdSelectors } from './byId';
import list, { selectors as listSelectors } from './list';
import { types } from './types';
import { actions as flashMessageActions } from '../flash_message';
import { SubmissionError } from 'redux-form';


const shouldRedirect = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_PROJECT_FAILURE:
      return true;
    case types.SET_SHOULD_REDIRECT:
      return action.bool;
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  list,
  shouldRedirect
});


const fetchProject = (id) => ((dispatch) => {
  dispatch(actions.fetchProjectsRequest());

  client.getProject(id).then(
    (response) => {
      dispatch(actions.fetchProjectSuccess(response.data));
    },
    (error) => { 
      dispatch(actions.fetchProjectFailure());
      dispatch(
        flashMessageActions.setFlashMessage(error.errors[0].detail)
      );
      console.log(error);
    }
  )
});

const fetchProjects = () => ((dispatch) => {
  dispatch(actions.fetchProjectsRequest());

  client.getProjects().then(
    (response) => {
      console.log('Response: ', response);
      dispatch(actions.fetchProjectsSuccess(response));
    },
    (error) => {
      dispatch(actions.fetchProjectsFailure());
      dispatch(
        flashMessageActions.setFlashMessage(error.error)
      )
    }
  )
})

const createProject = (project) => ((dispatch) => {
  dispatch(actions.createProjectRequest());

  return client.createProject(project).then(
    (response) => {
      dispatch(actions.createProjectSuccess(response.data));
    },
    (error) => {
      throw error;
    }
  )
})

export const actions = {
  fetchProjects,
  fetchProjectsRequest: () => ({
    type: types.FETCH_PROJECTS_REQUEST
  }),
  fetchProjectsSuccess: (response) => ({
    type: types.FETCH_PROJECTS_SUCCESS,
    response
  }),
  fetchProjectsFailure: () => ({
    type: types.FETCH_PROJECTS_FAILURE
  }),
  fetchProject,
  fetchProjectSuccess: (response) => ({
    type: types.FETCH_PROJECT_SUCCESS,
    response
  }),
  fetchProjectFailure: () => ({
    type: types.FETCH_PROJECT_FAILURE,
  }),
  createProject,
  createProjectRequest: () => ({
    type: types.CREATE_PROJECT_REQUEST
  }),
  createProjectSuccess: (response) => ({
    type: types.CREATE_PROJECT_SUCCESS,
    response
  }),
  setShouldRedirect: (bool) => ({
    type: types.SET_SHOULD_REDIRECT,
    bool
  }),
}

export const selectors = {
  getProjects: (state) => {
    const ids = listSelectors.getIds(state.list);
    return ids.map(id => byIdSelectors.getProject(state.byId, id));
  },
  getMemberIds: (pId, state) => {
    const project = byIdSelectors.getProject(state.byId, pId);
    
    return project.relationships.members.data.map(member => member.id);
  },
  getIsFetching: (state) => 
    listSelectors.getIsFetching(state.list)
}
