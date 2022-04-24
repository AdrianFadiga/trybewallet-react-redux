import { GET_EXPENSE_TO_EDIT } from '../actions';

const INITIAL_STATE = {
  editing: false,
  expenseToEdit: [],
};

const editing = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EXPENSE_TO_EDIT:
      return {
        editing: !state.editing,
        expenseToEdit: action.payload,
      };
    default:
      return state;
  }
};

export default editing;
