import {
  DashboardState,
  DashboardActionTypes,
  TOGGLE_FILTER
} from '../actions/dashboard.types';

const initialState: DashboardState = {
  isFilterOpen: false
};

export function dashboardReducer(
  state = initialState,
  action: DashboardActionTypes
): DashboardState {
  switch (action.type) {
    case TOGGLE_FILTER:
      return {
        ...state,
        isFilterOpen: !state.isFilterOpen
      };
    default:
      return state;
  }
}
