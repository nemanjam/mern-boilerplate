import {
  GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_USERS_LOADING,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
} from '../types';

const initialState = {
  users: [],
  profile: null,
  isLoading: false,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_USERS_LOADING:
    case GET_PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload.users,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: payload.profile,
      };
    case GET_USERS_FAIL:
    case GET_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        users: [],
        profile: null,
        error: payload,
      };
    default:
      return state;
  }
}
