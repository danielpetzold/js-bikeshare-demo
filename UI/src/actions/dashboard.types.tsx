export const TOGGLE_FILTER = 'TOGGLE_FILTER';

export interface DashboardState {
  isFilterOpen: boolean;
}

interface ToggleFilterAction {
  type: typeof TOGGLE_FILTER;
  payload: boolean;
}

export type DashboardActionTypes = ToggleFilterAction;
