import { combineReducers } from 'redux';
import byId from './byId';
import list from './list';

export default combineReducers({
  byId,
  list
})

