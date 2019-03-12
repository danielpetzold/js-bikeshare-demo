import { userData } from './userData';

export const loginUserService = (request: string) => {
  return userData.filter(user => user.role === request);
};
