export const USER_LOGIN = 'USER_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSE_TO_EDIT = 'GET_EXPENSE_TO_EDIT';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const addExpense = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const deleteExpense = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const getExpenseToEdit = (payload) => ({
  type: GET_EXPENSE_TO_EDIT,
  payload,
});

export const getCurrencies = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});
