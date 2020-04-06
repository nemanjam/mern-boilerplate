import {
  GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  EDIT_USER_LOADING,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
} from '../types';

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_PROFILE_LOADING:
    case EDIT_USER_LOADING:
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
    case GET_PROFILE_FAIL:
    case EDIT_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        profile: null,
        error: payload,
      };
    default:
      return state;
  }
}
