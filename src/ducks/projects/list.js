import { combineReducers } from 'redux';
import { types } from './types';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_SUCCESS:
      return Object.keys(action.response.projects);
    case types.CREATE_PROJECT_SUCCESS:
      return [ ...state, action.response.id ];
    case types.FETCH_PROJECT_SUCCESS:
      return [ ...state, action.response.id ];
    default:
      return state;
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_REQUEST:
      return true;
    case types.FETCH_PROJECTS_SUCCESS:
    case types.FETCH_PROJECTS_FAILURE:
    case types.FETCH_PROJECT_SUCCESS:
    case types.FETCH_PROJECT_FAILURE: 
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  ids,
  isFetching
});

export const selectors = {
  getIds : (state) => state.ids,
  getIsFetching : (state) => state.isFetching
}
