import { User } from '../store/Login/login.types';
import { userData } from '../helpers/userData';
import { visualizeHelper } from '../helpers/VisualizeHelper';
import { jasperServerUrl } from '../helpers/constants';

export const loginUser = (role: string) => {
  // Get user object from local data
  const user: User = userData.find((user: User) => {
    return user.role === role;
  }) as User;

  localStorage.setItem('user', JSON.stringify(user));

  // Add user role authentication to visualize config
  visualizeHelper.login(user.token, jasperServerUrl);

  return user;
};

export const isLoggedIn = (user: User) => !!user;
