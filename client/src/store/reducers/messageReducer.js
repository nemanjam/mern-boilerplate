import { GET_MESSAGES_LOADING, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAIL } from '../types';

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_MESSAGES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: payload.messages,
      };
    case GET_MESSAGES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
