import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_MESSAGES_LOADING,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  ADD_MESSAGE_LOADING,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAIL,
  DELETE_MESSAGE_LOADING,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
  EDIT_MESSAGE_LOADING,
  EDIT_MESSAGE_SUCCESS,
  EDIT_MESSAGE_FAIL,
  CLEAR_MESSAGE_ERROR,
} from '../types';

export const getMessages = () => async (dispatch, getState) => {
  dispatch({
    type: GET_MESSAGES_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/messages', options);

    dispatch({
      type: GET_MESSAGES_SUCCESS,
      payload: { messages: response.data.messages },
    });
  } catch (err) {
    dispatch({
      type: GET_MESSAGES_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const addMessage = (formData) => async (dispatch, getState) => {
  dispatch({
    type: ADD_MESSAGE_LOADING,
    payload: { me: { ...getState().auth.me } },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/messages', formData, options);

    dispatch({
      type: ADD_MESSAGE_SUCCESS,
      payload: { message: response.data.message },
    });
  } catch (err) {
    dispatch({
      type: ADD_MESSAGE_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deleteMessage = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_MESSAGE_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`/api/messages/${id}`, options);

    dispatch({
      type: DELETE_MESSAGE_SUCCESS,
      payload: { message: response.data.message },
    });
  } catch (err) {
    dispatch({
      type: DELETE_MESSAGE_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const editMessage = (id, formData) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_MESSAGE_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`/api/messages/${id}`, formData, options);

    dispatch({
      type: EDIT_MESSAGE_SUCCESS,
      payload: { message: response.data.message },
    });
  } catch (err) {
    dispatch({
      type: EDIT_MESSAGE_FAIL,
      payload: { error: err?.response?.data.message || err.message, id },
    });
  }
};

export const clearMessageError = (id) => ({
  type: CLEAR_MESSAGE_ERROR,
  payload: { id },
});
