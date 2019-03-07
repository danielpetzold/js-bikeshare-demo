import {
  ReportsState,
  ReportsActionTypes,
  SET_CATEGORIES
} from './reports.types';

const initialState: ReportsState = {
  categories: []
};

const reportsReducer = (
  state = initialState,
  action: ReportsActionTypes
): ReportsState => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    default:
      return state;
  }
};

export default reportsReducer;
