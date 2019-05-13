import { combineReducers } from 'redux';
import { History } from 'history';
import { RouterState, connectRouter } from 'connected-react-router';
import generalReducer from './General/general.reducer';
import { GeneralState } from './General/general.types';
import loginReducer from './Login/login.reducer';
import { LoginState } from './Login/login.types';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    general: generalReducer,
    login: loginReducer
  });

export interface State {
  router: RouterState;
  general: GeneralState;
  login: LoginState;
}

export default createRootReducer;
