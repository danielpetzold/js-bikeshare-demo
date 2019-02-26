import { combineReducers } from 'redux';
import { History } from 'history';
import { RouterState, connectRouter } from 'connected-react-router';
import generalReducer from './general';

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    general: generalReducer
  });

export interface State {
  router: RouterState;
}

export default rootReducer;
