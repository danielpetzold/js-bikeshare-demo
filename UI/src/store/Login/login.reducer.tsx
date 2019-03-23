import {
  LoginState,
  LoginActionTypes,
  SET_USER_LOGGED_OUT,
  SET_USER_LOGGED_IN
} from './login.types';

const initialState: LoginState = {
  isLoggedIn: false,
  user: {
    userName: '',
    title: '',
    role: '',
    token: ''
  }
};

const loginReducer = (
  state = initialState,
  action: LoginActionTypes
): LoginState => {
  switch (action.type) {
    case SET_USER_LOGGED_OUT:
      return {
        ...initialState
      };
    case SET_USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user
      };
    default:
      return state;
  }
};

export default loginReducer;
