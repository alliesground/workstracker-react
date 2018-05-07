import { client } from '../Client';
import {
  actions as flashMessageActions
} from './flash_message';

export const types = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_SHOULD_REDIRECT: 'SET_SHOULD_REDIRECT',
  SET_IS_LOGGED_IN: 'SET_IS_LOGGED_IN',
  SET_LOGIN_PROGRESS: 'SET_LOGIN_PROGRESS',
  HANDLE_UNAUTHENTIC_USER: 'HANDLE_UNAUTHENTIC_USER',
  HANDLE_AUTHENTIC_USER: 'HANDLE_AUTHENTIC_USER'
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
        ...state,
        loginProgress: false,
        shouldRedirect: true,
        isLoggedIn: true
      }
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loginProgress: false
      }
    case types.LOGOUT:
      return {
        ...state,
        shouldRedirect: false,
        loginProgress: false,
        isLoggedIn: false
      }
    case types.SET_SHOULD_REDIRECT:
      return {
        ...state,
        shouldRedirect: action.bool,
      }
    case types.SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.bool
      }
    case types.SET_LOGIN_PROGRESS:
      return {
        ...state,
        loginProgress: action.bool
      }
    case types.HANDLE_UNAUTHENTIC_USER:
      return {
        ...state,
        shouldRedirect: false,
        loginProgress: false,
        isLoggedIn: false
      }
    case types.HANDLE_AUTHENTIC_USER:
      return {
        ...state,
        shouldRedirect: true,
        loginProgress: false,
        isLoggedIn: true
      }
    default: {
      return state
    }
  }
}


const authenticate = () => (dispatch => {
  if (client.isLoggedIn()) {
    dispatch(actions.setIsLoggedIn(true));
    dispatch(flashMessageActions.setFlashMessage('Logged in successfully'));
  } else {
    dispatch(actions.handleUnauthenticUser);
    dispatch(flashMessageActions.setFlashMessage('Login first'));
    /*dispatch(actions.setIsLoggedIn(false));
    dispatch(actions.setLoginProgress(false));
    dispatch(actions.setShouldRedirect(false));*/
    console.log('calling authenticate');
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
  setShouldRedirect: (bool) => ({
    type: types.SET_SHOULD_REDIRECT,
    bool
  }),
  authenticate,
  setIsLoggedIn: (bool) => ({
    type: types.SET_IS_LOGGED_IN,
    bool
  }),
  setLoginProgress: (bool) => (
    {
      type: types.SET_LOGIN_PROGRESS,
      bool
    }
  ),
  handleUnauthenticUser: () => ({
    type: types.HANDLE_UNAUTHENTIC_USER
  }),
  handleAuthenticUser: () => ({
    type: types.HANDLE_AUTHENTIC_USER
  }),
}

