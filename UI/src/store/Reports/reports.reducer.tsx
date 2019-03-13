import {
  ReportsState,
  ReportsActionTypes,
  SET_FILTERS,
  SELECT_OPTION,
  CLEAR_FILTERS
} from './reports.types';

const initialState: ReportsState = {
  filters: []
};

const reportsReducer = (
  state = initialState,
  action: ReportsActionTypes
): ReportsState => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload
      };
    case SELECT_OPTION:
      let copyFilters: any = [...state.filters];
      copyFilters[action.payload.index].selected = action.payload.option;
      return {
        ...state,
        filters: copyFilters
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: action.payload
      };
    default:
      return state;
  }
};

export default reportsReducer;
