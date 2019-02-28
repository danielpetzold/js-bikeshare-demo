import { combineReducers } from 'redux';
import { History } from 'history';
import { RouterState, connectRouter } from 'connected-react-router';
import generalReducer from './general';
import { GeneralState } from '../types/general';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    general: generalReducer
  });

export interface State {
  router: RouterState;
  general: GeneralState;
}

export default createRootReducer;
