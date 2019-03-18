import { User } from '../../helpers/userData';

export const SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN';
export const SET_USER_LOGGED_OUT = 'SET_USER_LOGGED_OUT';

export interface LoginState {
  isLoggedIn: boolean;
  user: User;
}

interface SetUserLoggedIn {
  type: typeof SET_USER_LOGGED_IN;
  user: User;
}

interface SetUserLoggedOut {
  type: typeof SET_USER_LOGGED_OUT;
}

export type LoginActionTypes = SetUserLoggedIn | SetUserLoggedOut;
