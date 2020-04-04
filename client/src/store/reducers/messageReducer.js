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
} from '../types';

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
  isLoadingMessageId: null,
};

// You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_MESSAGES_LOADING:
    case ADD_MESSAGE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_MESSAGE_LOADING:
    case EDIT_MESSAGE_LOADING:
      return {
        ...state,
        isLoadingMessageId: payload.id,
      };

    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: payload.messages,
      };
    case ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: [payload.message, ...state.messages],
      };
    case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoadingMessageId: null,
        messages: state.messages.filter((m) => m.id !== payload.message.id),
      };
    case EDIT_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoadingMessageId: null,
        messages: state.messages.map((m) => {
          if (m.id === payload.message.id) return payload.message;
          return m;
        }),
      };
    case GET_MESSAGES_FAIL:
    case ADD_MESSAGE_FAIL:
    case DELETE_MESSAGE_FAIL:
    case EDIT_MESSAGE_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoadingMessageId: null,
        error: payload,
      };
    default:
      return state;
  }
}
