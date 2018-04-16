import { combineReducers } from 'redux';
import auth from './auth';
import flashMessage from './flash_message';
import projects from './projects/index';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  flashMessage,
  auth,
  projects,
  form: formReducer
})
