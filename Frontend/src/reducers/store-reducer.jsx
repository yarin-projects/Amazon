import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_INFO,
  USER_SIGNIN,
  USER_SIGNOUT,
} from '../actions.js';

const storeReducer = (state, { type, payload }) => {
  switch (type) {
    case USER_SIGNIN:
      return { ...state, userInfo: payload };
    case USER_SIGNOUT:
      localStorage.removeItem('userInfo');
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
      return {
        userInfo: null,
        cart: { ...state.cart, shippingAddress: {}, paymentMethod: '' },
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
    case REMOVE_FROM_CART: {
      const cartItems = state.cart.cartItems.filter(item => item.token !== payload.token);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case SAVE_SHIPPING_INFO: {
      localStorage.setItem('shippingAddress', JSON.stringify(payload));
      return { ...state, cart: { ...state.cart, shippingAddress: payload } };
    }
    case SAVE_PAYMENT_METHOD: {
      localStorage.setItem('paymentMethod', JSON.stringify(payload));
      return { ...state, cart: { ...state.cart, paymentMethod: payload } };
    }
    case CLEAR_CART:
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    default:
      return state;
  }
};

export default storeReducer;
