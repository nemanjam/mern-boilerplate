import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import { GET_FEATURE, GET_PROFILE, SET_ERROR } from '../types';

export const getProfile = () => async (dispatch, getState) => {
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/profile', options);

    dispatch({
      type: GET_PROFILE,
      payload: response.data.profile,
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response.data,
    });
  }
};

export const getFeature = () => async (dispatch, getState) => {
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/feature', options);

    dispatch({
      type: GET_FEATURE,
      payload: response.data.feature,
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response.data,
    });
  }
};
