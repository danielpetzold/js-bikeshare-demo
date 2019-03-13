import { LOGIN_USER, LoginUserAction, User } from './login.types';

export const loginUser = (user: User): LoginUserAction => {
  return {
    type: LOGIN_USER,
    user
  };
};
