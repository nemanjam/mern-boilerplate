import axios from 'axios';

import {
  SET_ERROR,
  LOGIN_WITH_OAUTH_LOADING,
  LOGIN_WITH_OAUTH_SUCCESS,
  LOGIN_WITH_OAUTH_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_WITH_EMAIL_LOADING,
  REGISTER_WITH_EMAIL_SUCCESS,
  REGISTER_WITH_EMAIL_FAIL,
  LOGIN_WITH_EMAIL_LOADING,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_FAIL,
  ME_LOADING,
  ME_SUCCESS,
  ME_FAIL,
} from '../types';

export const loadMe = () => async (dispatch, getState) => {
  dispatch({ type: ME_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/me', options);

    dispatch({
      type: ME_SUCCESS,
      payload: { me: response.data.me },
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response.data,
    });

    dispatch({
      type: ME_FAIL,
    });
  }
};

export const registerUserWithEmail = (formData, cb, cbErr) => async (dispatch, getState) => {
  dispatch({ type: REGISTER_WITH_EMAIL_LOADING });
  try {
    const response = await axios.post('/auth/register', formData);
    dispatch({
      type: REGISTER_WITH_EMAIL_SUCCESS,
    });
    cb();
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response.data,
    });

    dispatch({
      type: REGISTER_WITH_EMAIL_FAIL,
    });
    cbErr();
  }
};

export const loginUserWithEmail = (formData, cb, cbErr) => async (dispatch, getState) => {
  dispatch({ type: LOGIN_WITH_EMAIL_LOADING });
  try {
    const response = await axios.post('/auth/login', formData);

    dispatch({
      type: LOGIN_WITH_EMAIL_SUCCESS,
      payload: { token: response.data.token, me: response.data.me },
    });
    cb();
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERROR,
      //payload: err.response.data,
    });

    dispatch({
      type: LOGIN_WITH_EMAIL_FAIL,
    });
    cbErr();
  }
};

export const logInUserWithOauth = token => async (dispatch, getState) => {
  dispatch({ type: LOGIN_WITH_OAUTH_LOADING });

  try {
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };

    const response = await axios.get('/api/me', { headers });

    dispatch({
      type: LOGIN_WITH_OAUTH_SUCCESS,
      payload: { me: response.data.me, token },
    });
  } catch (err) {
    dispatch({
      type: LOGIN_WITH_OAUTH_FAIL,
    });

    dispatch({
      type: SET_ERROR,
      payload: err.response.data,
    });
  }
};

// Log user out
export const logOutUser = cb => async dispatch => {
  try {
    deleteAllCookies();
    await axios.get('/auth/logout');

    dispatch({
      type: LOGOUT_SUCCESS,
    });
    cb();
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response.data,
    });
    cb();
  }
};

function deleteAllCookies() {
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export const attachTokenToHeaders = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
