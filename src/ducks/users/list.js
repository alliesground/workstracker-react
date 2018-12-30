import { combineReducers } from 'redux';
import { types } from '../projects/types';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_SUCCESS:
      return Object.keys(action.response.users)
    default:
        return state;
  }
}

export default combineReducers({
  ids
});
