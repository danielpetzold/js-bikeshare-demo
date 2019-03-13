import { UserState, LOGIN_USER, LoginActionTypes } from './login.types';

const initialState: UserState = {
  userName: '',
  title: '',
  role: '',
  token: ''
};

export const loginReducer = (
  state = initialState,
  action: LoginActionTypes
): UserState => {
  console.log(action.user);
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.user
      };
    default:
      return state;
  }
};
