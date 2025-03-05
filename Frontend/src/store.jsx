import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import storeReducer from './reducers/store-reducer';
import { getLocalStorageItems } from './utils';

const { userInfo, cartItems, shippingAddress, paymentMethod } = getLocalStorageItems();

const Store = createContext();

const initialState = {
  userInfo,
  cart: {
    cartItems,
    shippingAddress,
    paymentMethod,
  },
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <>
      <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
    </>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export { Store, StoreProvider };
