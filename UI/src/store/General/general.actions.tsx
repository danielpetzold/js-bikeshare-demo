import { TOGGLE_NO_ACCESS, SET_SESSION_ID } from './general.types';

export const toggleNoAccess = () => {
  return {
    type: TOGGLE_NO_ACCESS
  };
};

export const setSessionId = (sessionId: string) => {
  return {
    type: SET_SESSION_ID,
    sessionId: sessionId
  };
};
