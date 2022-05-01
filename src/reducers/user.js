import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: 'adrian@adrian.com',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        email: action.payload,
      };
    default:
      return state;
  }
};

export default wallet;
