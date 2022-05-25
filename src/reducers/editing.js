import { GET_EXPENSE_TO_EDIT, DISABLE_EDITING } from '../actions';

const INITIAL_STATE = {
  editing: false,
  index: 0,
};

const editing = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case ENABLE_EDITING:
    //   return {
    //     ...state,
    //     editing: true,
    //   };
    case GET_EXPENSE_TO_EDIT:
      return {
        editing: !state.editing,
        index: action.payload,
      };
    case DISABLE_EDITING:
      return {
        ...state,
        editing: false,
      };
    default:
      return state;
  }
};

export default editing;
