import { GET_FEATURE, GET_PROFILE } from '../types';

const initialState = {
  message: '',
  profile: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEATURE:
      return {
        ...state,
        message: action.payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
}
