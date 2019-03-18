import {
  GeneralState,
  GeneralActionTypes,
  TOGGLE_NO_ACCESS
} from './general.types';

const initialState: GeneralState = {
  showNoAccess: false
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
    default:
      return state;
  }
};

export default generalReducer;
