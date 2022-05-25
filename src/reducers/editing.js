import { GET_EXPENSE_TO_EDIT, DISABLE_EDITING } from '../actions';

const INITIAL_STATE = {
  editing: false,
  // expenseToEdit: {
  //   expense: {
  //     id: '1',
  //     convertTo: 'BRL',
  //     currency: 'USD',
  //     description: '',
  //     method: 'Dinheiro',
  //     tag: 'Alimentação',
  //     value: 0,
  //   },
  // },
  index: 0,
};

const editing = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
