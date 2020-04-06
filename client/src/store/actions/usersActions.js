import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import { GET_USERS_LOADING, GET_USERS_SUCCESS, GET_USERS_FAIL } from '../types';

export const getUsers = () => async (dispatch, getState) => {
  dispatch({
    type: GET_USERS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/users', options);

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: { users: response.data.users },
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_FAIL,
      payload: err.message,
    });
  }
};
