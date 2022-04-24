import { EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  editing: false,
  expenseObj: [],
};

const editing = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDIT_EXPENSE:
      return {
        editing: !state.editing,
        expenseObj: action.payload,
      };
    default:
      return state;
  }
};

export default editing;
