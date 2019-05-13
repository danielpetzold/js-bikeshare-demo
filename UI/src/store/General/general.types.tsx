export interface GeneralState {
  showNoAccess: boolean;
  sessionId: string;
}

export const TOGGLE_NO_ACCESS = 'show no access modal';
export const SET_SESSION_ID = 'set session id';

interface ToggleNoAccess {
  type: typeof TOGGLE_NO_ACCESS;
}
interface SetSessionId {
  type: typeof SET_SESSION_ID;
  sessionId: string;
}

export type GeneralActionTypes = ToggleNoAccess | SetSessionId;
