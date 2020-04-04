import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  auth: authReducer,
  message: messageReducer,
  user: userReducer,
  errors: errorReducer,
});
