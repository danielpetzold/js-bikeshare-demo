import { combineReducers } from 'redux';
import { History } from 'history';
import { RouterState, connectRouter } from 'connected-react-router';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history)
  });

export interface State {
  router: RouterState;
}

export default createRootReducer;
