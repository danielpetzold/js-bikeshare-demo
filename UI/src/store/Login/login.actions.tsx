import { LOGIN_USER, LoginUserAction, User } from './login.types';

export const loginUser = (user: User): LoginUserAction => {
  console.log('login user action');
  return {
    type: LOGIN_USER,
    user
  };
};
