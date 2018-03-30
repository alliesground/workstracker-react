import { client } from '../Client';
import { 
  actions as flashMessageActions 
} from './flash_message';

export const types = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT'
}

const initialState = {
  shouldRedirect: false,
  loginProgress: false
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
        shouldRedirect: true
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
        loginProgress: false
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
  })
}
