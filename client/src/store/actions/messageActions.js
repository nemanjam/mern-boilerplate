import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import { GET_MESSAGES_LOADING, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAIL } from '../types';

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
      payload: err.response.data,
    });
  }
};
