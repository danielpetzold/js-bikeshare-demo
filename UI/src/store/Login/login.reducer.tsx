import {
  LoginState,
  LoginActionTypes,
  SET_USER_LOGGED_OUT,
  SET_USER_LOGGED_IN, SET_USER_FRANCHISES, SET_USER_REGIONS
} from "./login.types";

const initialState: LoginState = {
  isLoggedIn: false,
  user: {
    userName: '',
    title: '',
    role: '',
    token: ''
  },
  regions: [],
  franchises: []
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
    case SET_USER_FRANCHISES:
      return {
        ...state,
        franchises: action.franchises
      };
    case SET_USER_REGIONS:
      return {
        ...state,
        regions: action.regions
      };
    default:
      return state;
  }
};

export default loginReducer;
