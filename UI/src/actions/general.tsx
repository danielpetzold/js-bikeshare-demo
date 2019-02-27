import { DISPLAY_NO_ACCESS, HIDE_NO_ACCESS } from '../types/general';

export const displayNoAccess = () => {
  return {
    type: DISPLAY_NO_ACCESS
  };
};
export const hideNoAccess = () => {
  return {
    type: HIDE_NO_ACCESS
  };
};
