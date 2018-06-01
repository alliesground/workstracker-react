import { client } from './Client';
import { actions as authActions } from './ducks/auth';

export function checkToken({ dispatch, getState }) {
  return (next) =>
    (action) => {
      console.log('Middleware dispatching...')
      const isLoggedIn = getState().auth.isLoggedIn;
      if (isLoggedIn) {
        console.log('Before Invalid');
        if (!client.isTokenValid()) {
          console.log('Invalid Token...');
          setTimeout(() => dispatch(authActions.logout()), 0);
        }
      }
      return next(action);
    }
}

