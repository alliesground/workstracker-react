import { combineReducers } from 'redux';
import auth from './auth';
import flashMessage from './flash_message';

export default combineReducers({
  flashMessage,
  auth,
})
