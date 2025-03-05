import { USER_SIGNIN, USER_SIGNOUT } from '../actions.js';

const storeReducer = (state, { type, payload }) => {
  switch (type) {
    case USER_SIGNIN:
      return { ...state, userInfo: payload };
    case USER_SIGNOUT:
      return { ...state, userInfo: null };
    default:
      return state;
  }
};

export default storeReducer;
