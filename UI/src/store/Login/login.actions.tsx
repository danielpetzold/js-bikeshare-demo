import { visualizeHelper } from '../../helpers/VisualizeHelper';
import { User, userData } from '../../helpers/userData';
import { jasperServerUrl } from '../../helpers/constants';
import { Dispatch } from 'redux';
import { SET_USER_LOGGED_IN, SET_USER_LOGGED_OUT } from './login.types';
import { history } from '../../configureStore';

// === Thunk action creators === //
/**
 * Fetch user info and add to local storage and redux store.
 * @param role
 */
export const loginUser = (role: String) => {
  return async (dispatch: Dispatch) => {
    try {
      // Instead of a service, we're grabbing the user and token from a local file
      let user: User = userData.find(user => user.role === role) as User;

      // Store user to resume after refresh
      localStorage.clear();
      localStorage.setItem('user', JSON.stringify(user));

      // Login user to global Visualize JS instance ()
      await visualizeHelper.login(user.token, jasperServerUrl);

      dispatch(setUserLoggedIn(user));
    } catch (error) {
      console.log('There was an error when logging in', error);
    }
  };
};

/**
 * Log user out of visualize.js, clear user info
 */
export const logOutUser = () => {
  return async (dispatch: Dispatch) => {
    await visualizeHelper.logOut();
    dispatch(setUserLoggedOut());
    localStorage.clear();
    history.push('/');
  };
};

// === Redux Actions === //

export const setUserLoggedIn = (user: User) => {
  return {
    type: SET_USER_LOGGED_IN,
    user: user
  };
};

export const setUserLoggedOut = () => {
  return {
    type: SET_USER_LOGGED_OUT
  };
};
