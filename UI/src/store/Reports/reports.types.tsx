export interface ReportsState {
  filters: object[];
}

export const SET_FILTERS = 'set filters';
export const SELECT_OPTION = 'select option';
export const CLEAR_FILTERS = 'clear filters';

interface SetFilters {
  type: typeof SET_FILTERS;
  payload: object[];
}
interface SelectOption {
  type: typeof SELECT_OPTION;
  payload: {
    index: number;
    option: any;
  };
}
interface ClearFilters {
  type: typeof CLEAR_FILTERS;
  payload: object[];
}

export type ReportsActionTypes = SetFilters | SelectOption | ClearFilters;
