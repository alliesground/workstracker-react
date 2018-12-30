import { types } from '../projects/types';

export default (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_SUCCESS:
      const nextState = { ...state };
      Object.entries(action.response.users).forEach(
        ([key, user]) => nextState[key] = user
      );
      return nextState;
    default:
      return state;
  }
}

export const selectors = {
  getUser : (state, id) => state[id]
}

