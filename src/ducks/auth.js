import { client } from '../Client';
import { 
  actions as flashMessageActions
} from './flash_message';

export const types = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  RESET_SHOULD_REDIRECT: 'RESET_SHOULD_REDIRECT',
  SET_IS_LOGGED_IN: 'SET_IS_LOGGED_IN'
}

const initialState = {
  shouldRedirect: false,
  loginProgress: false,
  isLoggedIn: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loginProgress: true
      };
    case types.LOGIN_SUCCESS:
      return {
        loginProgress: false,
        shouldRedirect: true
      }
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loginProgress: false
      }
    case types.LOGOUT:
      return {
        shouldRedirect: false,
        loginProgress: false
      }
    case types.RESET_SHOULD_REDIRECT:
      return {
        ...state,
        shouldRedirect: false,
      }
    case types.SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.bool
      }
    default: {
      return state
    }
  }
}

const authenticate = () => (dispatch => {
  let message = null;

  if(client.isTokenExpired()) {
    message = 'Token expired'
  }

  if(!client.token) {
    message = 'Please signup or signin before continuing'
  }

  if (client.isLoggedIn()) {
    dispatch(flashMessageActions.setFlashMessage('Logged in successfully'));
    dispatch(actions.setIsLoggedIn(true));
  } else {
    dispatch(flashMessageActions.setFlashMessage(message));
    dispatch(actions.setIsLoggedIn(false));
  }
});

const login = (email, password) => ((dispatch) => {
  dispatch(actions.loginRequest());

  client.login(email, password).then(
      (response) => {
        dispatch(actions.loginSuccess());
      },
      (error) => {
        dispatch(actions.loginFailure());
        dispatch(
          flashMessageActions.setFlashMessage(error.error)
        )
      }
    );
});

export const actions = {
  login,
  loginRequest: () => ({
    type: types.LOGIN_REQUEST
  }),
  loginSuccess: () => ({
    type: types.LOGIN_SUCCESS
  }),
  loginFailure: () => ({
    type: types.LOGIN_FAILURE
  }),
  logout: () => ({
    type: types.LOGOUT
  }),
  resetShouldRedirect: () => ({
    type: types.RESET_SHOULD_REDIRECT
  }),
  authenticate,
  setIsLoggedIn: (bool) => ({
    type: types.SET_IS_LOGGED_IN,
    bool
  })
}
