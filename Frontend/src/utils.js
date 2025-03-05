import axios from 'axios';
import { ADD_TO_CART } from './actions';

export const getLocalStorageItems = () => {
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
  const shippingAddress = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};
  const paymentMethod = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : '';
  return { userInfo, cartItems, shippingAddress, paymentMethod };
};

export const addToCartHandler = async (product, cartItems, dispatch) => {
  const existingItem = cartItems.find(item => item.token === product.token);
  const quantity = existingItem ? existingItem.quantity + 1 : 1;
  try {
    const { data } = await axios.get(`/api/products/token/${product.token}`);
    if (data.countInStock < quantity) {
      // toast.error("Product is out of stock");
      return;
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...product,
        quantity,
      },
    });
  } catch (error) {
    // toast.error(error.response?.data?.message);
  }
};
