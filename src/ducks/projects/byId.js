import { types } from './types';

export default (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_SUCCESS:
      const nextState = { ...state };
      action.response.forEach(project => {
        nextState[project.id] = project;
      });
      return nextState;
    case types.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        [action.response.id]: action.response
      }
    default:
      return state;
  }
}

export const selectors = {
  getProject : (state, id) => state[id]
}
