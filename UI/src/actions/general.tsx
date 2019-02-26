export const DISPLAY_NO_ACCESS = 'show no access modal';
export const HIDE_NO_ACCESS = 'hide no access modal';

export const displayNoAccess = () => {
  return {
    type: DISPLAY_NO_ACCESS,
    payload: true
  };
};
export const hideNoAccess = () => {
  return {
    type: HIDE_NO_ACCESS,
    payload: false
  };
};
