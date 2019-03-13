import { combineReducers } from 'redux';
import { History } from 'history';
import { RouterState, connectRouter } from 'connected-react-router';
import generalReducer from './General/general.reducer';
import { GeneralState } from './General/general.types';
import reportsReducer from './Reports/reports.reducer';
import { ReportsState } from './Reports/reports.types';
import { loginReducer } from './Login/login.reducer';
import { UserState } from './Login/login.types';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    general: generalReducer,
    reports: reportsReducer,
    user: loginReducer
  });

export interface State {
  router: RouterState;
  general: GeneralState;
  reports: ReportsState;
  user: UserState;
}

export default createRootReducer;
