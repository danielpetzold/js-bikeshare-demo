import { DISPLAY_NO_ACCESS, HIDE_NO_ACCESS } from '../actions/general';

const initialState = {
  showNoAccess: true
};

const generalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DISPLAY_NO_ACCESS:
      return {
        ...state,
        showNoAccess: action.payload
      };
    case HIDE_NO_ACCESS:
      return {
        ...state,
        showNoAccess: action.payload
      };
    default:
      return state;
  }
};

export default generalReducer;
