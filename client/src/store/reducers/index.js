import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  auth: authReducer,
  message: messageReducer,
  user: userReducer,
  users: usersReducer,
});
