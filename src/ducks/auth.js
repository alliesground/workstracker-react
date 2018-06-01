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
    default: {
      return state
    }
  }
}

const logout = () => ((dispatch) => {
  if (client.isTokenExpired) {
    console.log('no server request');
    dispatch({ type: types.LOGOUT });
  } else {
    client.logout().then(
      (response) => {
        dispatch({type: types.LOGOUT});
      },
      (error) => {
        console.log(error);
      }
    )
  }
});

const login = (email, password) => ((dispatch) => {
  dispatch(actions.loginRequest());

  client.login(email, password).then(
      (response) => {
        console.log('Login success fired')
        dispatch(actions.loginSuccess());
      },
      (error) => {
        dispatch(actions.loginFailure());
        error.errors.forEach(e => {
          dispatch(
            flashMessageActions.setFlashMessage(e)
          )
        })
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
  logout,
  setShouldRedirect: (bool) => ({
    type: types.SET_SHOULD_REDIRECT,
    bool
  }),
  setIsLoggedIn: (bool) => ({
    type: types.SET_IS_LOGGED_IN,
    bool
  })
}

