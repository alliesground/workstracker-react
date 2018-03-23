import { client } from '../Client';
import { 
  actions as flashMessageActions 
} from './flash_message';

export const types = {
  LOGIN_PROGRESS: 'LOGIN_PROGRESS',
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
    case types.LOGIN_PROGRESS:
      return {
        ...state,
        loginProgress: action.bool
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
  dispatch(actions.loginProgress(true));

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
  loginProgress: (bool) => ({
    type: types.LOGIN_PROGRESS,
    bool
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
