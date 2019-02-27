export interface GeneralState {
  showNoAccess: boolean;
}

export const DISPLAY_NO_ACCESS = 'show no access modal';
export const HIDE_NO_ACCESS = 'hide no access modal';

interface DisplayNoAccess {
  type: typeof DISPLAY_NO_ACCESS;
}

interface HideNoAccess {
  type: typeof HIDE_NO_ACCESS;
}

export type GeneralActionTypes = DisplayNoAccess | HideNoAccess;
