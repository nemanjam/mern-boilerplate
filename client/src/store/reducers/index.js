import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import privateReducer from './privateReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  auth: authReducer,
  message: messageReducer,
  private: privateReducer,
  errors: errorReducer,
});
