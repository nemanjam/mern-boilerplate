import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import privateReducer from './privateReducer';

export default combineReducers({
  auth: authReducer,
  private: privateReducer,
  errors: errorReducer,
});
