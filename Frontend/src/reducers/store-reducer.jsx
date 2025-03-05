import { ADD_TO_CART, USER_SIGNIN, USER_SIGNOUT } from '../actions.js';

const storeReducer = (state, { type, payload }) => {
  switch (type) {
    case USER_SIGNIN:
      return { ...state, userInfo: payload };
    case USER_SIGNOUT:
      localStorage.clear();
      return {
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
      };
    case ADD_TO_CART: {
      const newItem = payload;
      const existingItems = state.cart.cartItems.find(item => item.token === newItem.token);

      const cartItems = existingItems
        ? state.cart.cartItems.map(item => (item.token === existingItems.token ? newItem : item))
        : [...state.cart.cartItems, newItem];

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
};

export default storeReducer;
