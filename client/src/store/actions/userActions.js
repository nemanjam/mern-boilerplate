import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  EDIT_USER_LOADING,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
  DELETE_USER_LOADING,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../types';

import { logOutUser } from './authActions';

export const editUser = (formData) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_USER_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put('/api/users', formData, options);

    dispatch({
      type: EDIT_USER_SUCCESS,
      payload: { user: response.data.user },
    });
  } catch (err) {
    dispatch({
      type: EDIT_USER_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const getProfile = () => async (dispatch, getState) => {
  dispatch({
    type: GET_PROFILE_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/users/profile', options);

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: { profile: response.data.profile },
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deleteUser = (id, history) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_USER_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`/api/users/${id}`, options);

    dispatch(logOutUser(id, history));

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: { message: response.data.user },
    });
  } catch (err) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
