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

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

// You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_MESSAGES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_MESSAGE_LOADING:
      return {
        ...state,
        messages: [
          {
            id: 0,
            text: 'Loading...',
            isLoading: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user: { ...payload.me },
          },
          ...state.messages,
        ],
      };
    case DELETE_MESSAGE_LOADING:
    case EDIT_MESSAGE_LOADING:
      return {
        ...state,
        messages: state.messages.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: true };
          return m;
        }),
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
        messages: state.messages.map((m) => {
          if (m.id === 0) return payload.message;
          return m;
        }),
      };
    case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: state.messages.filter((m) => m.id !== payload.message.id),
      };
    case EDIT_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: state.messages.map((m) => {
          if (m.id === payload.message.id) return payload.message;
          return m;
        }),
      };
    case DELETE_MESSAGE_FAIL:
    case EDIT_MESSAGE_FAIL:
      return {
        ...state,
        error: null,
        messages: state.messages.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: false, error: payload.error };
          return m;
        }),
      };
    case GET_MESSAGES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    case ADD_MESSAGE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        messages: state.messages.filter((m) => m.id !== 0),
      };
    case CLEAR_MESSAGE_ERROR:
      return {
        ...state,
        messages: state.messages.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: false, error: null };
          return m;
        }),
      };
    default:
      return state;
  }
}
