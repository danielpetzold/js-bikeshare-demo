export interface GeneralState {
  showNoAccess: boolean;
}

export const TOGGLE_NO_ACCESS = 'show no access modal';

interface ToggleNoAccess {
  type: typeof TOGGLE_NO_ACCESS;
}

export type GeneralActionTypes = ToggleNoAccess;
