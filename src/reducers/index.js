import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import editing from './editing';

const rootReducer = combineReducers({ user, wallet, editing });

export default rootReducer;
