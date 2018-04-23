import { combineReducers } from 'redux';
import { client } from '../../Client';
import byId, { selectors as byIdSelectors } from './byId';
import list, { selectors as listSelectors } from './list';
import { types } from './types';
import { actions as flashMessageActions } from '../flash_message';
import { SubmissionError } from 'redux-form';

export default combineReducers({
  byId,
  list
});

const fetchProjects = () => ((dispatch) => {
  dispatch(actions.fetchProjectsRequest());

  client.getProjects().then(
    (response) => {
      dispatch(actions.fetchProjectsSuccess(response.data));
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
  createProject,
  createProjectRequest: () => ({
    type: types.CREATE_PROJECT_REQUEST
  }),
  createProjectSuccess: (response) => ({
    type: types.CREATE_PROJECT_SUCCESS,
    response
  })
}

export const selectors = {
  getProjects: (state) => {
    const ids = listSelectors.getIds(state.list);
    return ids.map(id => byIdSelectors.getProject(state.byId, id));
  },
  getIsFetching: (state) => 
    listSelectors.getIsFetching(state.list)
}
