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

const initialState = {
  profile: {},
  isLoading: false,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_PROFILE_LOADING:
    case EDIT_USER_LOADING:
    case DELETE_USER_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: payload.profile,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: payload.user,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: {},
      };
    case GET_PROFILE_FAIL:
    case EDIT_USER_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        profile: {},
        error: payload.error,
      };
    default:
      return state;
  }
}
