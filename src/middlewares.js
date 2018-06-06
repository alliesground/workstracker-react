import { client } from './Client';
import { actions as authActions } from './ducks/auth';
import { actions as flashMessageActions } from './ducks/flash_message';

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

export function resetFlashMessage({ dispatch, getState }) {
  return (next) =>
    (action) => {
      const returnVal = next(action);

      if (getState().flashMessage) {
        setTimeout(() => dispatch(flashMessageActions.resetFlashMessage()), 4000);
      }

      return returnVal;
    }
}

