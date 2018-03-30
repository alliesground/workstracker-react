import { combineReducers } from 'redux';
import auth from './auth';
import flashMessage from './flash_message';
import projects from './projects/index';

export default combineReducers({
  flashMessage,
  auth,
  projects
})
