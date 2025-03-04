import { USER_SIGNIN } from '../actions.js';

const storeReducer = (state, { type, payload }) => {
  switch (type) {
    case USER_SIGNIN:
      return { ...state, userInfo: payload };

    default:
      return state;
  }
};

export default storeReducer;
