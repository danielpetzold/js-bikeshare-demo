import {
  GeneralState,
  GeneralActionTypes,
  DISPLAY_NO_ACCESS,
  HIDE_NO_ACCESS
} from '../types/general';

const initialState: GeneralState = {
  showNoAccess: false
};

const generalReducer = (
  state = initialState,
  action: GeneralActionTypes
): GeneralState => {
  switch (action.type) {
    case DISPLAY_NO_ACCESS:
      return {
        ...state,
        showNoAccess: true
      };
    case HIDE_NO_ACCESS:
      return {
        ...state,
        showNoAccess: false
      };
    default:
      return state;
  }
};

export default generalReducer;
