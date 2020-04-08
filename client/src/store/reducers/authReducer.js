import {
  LOGIN_WITH_OAUTH_LOADING,
  LOGIN_WITH_OAUTH_SUCCESS,
  LOGIN_WITH_OAUTH_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_WITH_EMAIL_LOADING,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_FAIL,
  ME_LOADING,
  ME_SUCCESS,
  ME_FAIL,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  me: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_WITH_EMAIL_LOADING:
    case LOGIN_WITH_OAUTH_LOADING:
    case ME_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_WITH_EMAIL_SUCCESS:
    case LOGIN_WITH_OAUTH_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: payload.token,
        me: payload.me,
        error: null,
      };
    case ME_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        me: payload.me,
        error: null,
      };
    case LOGOUT_SUCCESS:
    case ME_FAIL:
    case LOGIN_WITH_EMAIL_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        me: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
}
