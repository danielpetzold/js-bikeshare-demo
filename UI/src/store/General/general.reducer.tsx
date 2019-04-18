import {
  GeneralState,
  GeneralActionTypes,
  TOGGLE_NO_ACCESS,
  SET_SESSION_ID
} from './general.types';

const initialState: GeneralState = {
  showNoAccess: false,
  sessionId: ''
};

const generalReducer = (
  state = initialState,
  action: GeneralActionTypes
): GeneralState => {
  switch (action.type) {
    case TOGGLE_NO_ACCESS:
      return {
        ...state,
        showNoAccess: !state.showNoAccess
      };
    case SET_SESSION_ID:
      return {
        ...state,
        sessionId: action.sessionId
      };
    default:
      return state;
  }
};

export default generalReducer;
