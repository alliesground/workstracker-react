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
}

const initialState = {
  shouldRedirect: false,
  loginProgress: false,
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
      }
    case types.SET_SHOULD_REDIRECT:
      return {
        ...state,
        shouldRedirect: action.bool,
      }
    default: {
      return state
    }
  }
}

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

const authenticate = () => ((dispatch) => {
  console.log('authenticate called');
  if(!client.isLoggedIn()) {
    let message = null;

    if (client.isTokenExpired()) {
      message = 'Your Token expired. Please login again';
    }

    if (!client.token) {
      message = 'Please login first';
    }

    client.removeToken();
    actions.setShouldRedirect(false);
    flashMessageActions.setFlashMessage(message);
  }
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
  authenticate
}

