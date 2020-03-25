import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import privateReducer from "./privateReducer";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  private: privateReducer,
  errors: errorReducer
});
