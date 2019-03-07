export interface ReportsState {
  categories: object[];
}

export const SET_CATEGORIES = 'set categories';

interface SetCategories {
  type: typeof SET_CATEGORIES;
  payload: any;
}

export type ReportsActionTypes = SetCategories;
