import { GET_USERS_LOADING, GET_USERS_SUCCESS, GET_USERS_FAIL } from '../types';

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_USERS_LOADING:
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
    case GET_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        users: [],
        error: payload,
      };
    default:
      return state;
  }
}
