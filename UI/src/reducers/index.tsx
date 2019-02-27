import { combineReducers } from 'redux';
import { History } from 'history';
import { RouterState, connectRouter } from 'connected-react-router';
import { dashboardReducer } from './Dashboard.reducers';
import { DashboardState } from '../actions/dashboard.types';

const createRootReducer = (history: History) =>
  combineReducers({
    dashboard: dashboardReducer,
    router: connectRouter(history)
  });

export interface State {
  dashboard: DashboardState;
  router: RouterState;
}

export default createRootReducer;
