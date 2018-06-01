import { client } from './Client';
import { actions as authActions } from './ducks/auth';

export function checkToken({ dispatch, getState }) {
  return (next) =>
    (action) => {
      const returnVal = next(action);

      if (getState().auth.isLoggedIn) {
        console.log('Time to expire: ', client.tokenTimeToExpireInMinutes());
        if (!client.isTokenValid()) {
          setTimeout(() => dispatch(authActions.logoutOnTokenExpiry()), 0);
        }
      }
      return returnVal;
    }
}

