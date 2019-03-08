import { SET_FILTERS, SELECT_OPTION, CLEAR_FILTERS } from './reports.types';

export const setFilters = (filters: object[]) => {
  return {
    type: SET_FILTERS,
    payload: filters
  };
};

export const selectOption = (option: object) => {
  return {
    type: SELECT_OPTION,
    payload: option
  };
};

export const clearFilters = (filters: object[]) => {
  filters.forEach((filter: any) => (filter.selected = ''));

  return {
    type: CLEAR_FILTERS,
    payload: filters
  };
};
