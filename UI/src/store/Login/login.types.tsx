import { User } from '../../helpers/userData';

export const SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN';
export const SET_USER_LOGGED_OUT = 'SET_USER_LOGGED_OUT';
export const SET_USER_REGIONS = 'SET_USER_REGIONS';
export const SET_USER_FRANCHISES = 'SET_USER_FRANCHISES';

export interface LoginState {
  isLoggedIn: boolean;
  user: User;
  regions: any[];
  franchises: any[];
}

interface SetUserLoggedIn {
  type: typeof SET_USER_LOGGED_IN;
  user: User;
}

interface SetUserLoggedOut {
  type: typeof SET_USER_LOGGED_OUT;
}

interface SetUserRegions {
  type: typeof SET_USER_REGIONS,
  regions: any
}

interface SetUserFranchises {
  type: typeof SET_USER_FRANCHISES,
  franchises: any
}

export type LoginActionTypes = SetUserLoggedIn | SetUserLoggedOut | SetUserRegions | SetUserFranchises;
