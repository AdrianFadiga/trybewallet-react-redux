import { GET_EXPENSE_TO_EDIT, DISABLE_EDITING } from '../actions';

const INITIAL_STATE = {
  editing: false,
  expenseToEdit: [{ expense: { id: 'xablau' } }],
};

const editing = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EXPENSE_TO_EDIT:
      console.log(action.payload);
      return {
        editing: !state.editing,
        expenseToEdit: action.payload,
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
