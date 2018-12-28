import { types } from '../projects/types';

export default (state = [], action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_SUCCESS:
      return Object.keys(action.response.users)
    default:
      return state;
  }
}

