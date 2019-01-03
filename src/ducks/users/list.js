import { combineReducers } from 'redux';
import { types } from '../projects/types';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_SUCCESS:
      if (action.response.hasOwnProperty('users')) {
        return Object.keys(action.response.users)
      } else { return state }
    default:
        return state;
  }
}

export default combineReducers({
  ids
});
