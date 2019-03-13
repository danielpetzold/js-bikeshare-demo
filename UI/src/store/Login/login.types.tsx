import { User } from '../../helpers/userData';

export const LOGIN_USER = 'LOGIN_USER';

export interface UserState {
  userName: string;
  title: string;
  role: string;
  token: string;
}

export interface User {
  userName: string;
  title: string;
  role: string;
  token: string;
}

export interface LoginUserAction {
  type: typeof LOGIN_USER;
  user: User;
}

export type LoginActionTypes = LoginUserAction;
