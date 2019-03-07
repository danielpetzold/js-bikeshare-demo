import { SET_CATEGORIES } from './reports.types';

export const setCategories = (categories: object[]) => {
  return {
    type: SET_CATEGORIES,
    payload: categories
  };
};
