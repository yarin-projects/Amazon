import axios from 'axios';
import { toast } from 'react-toastify';
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
    const { data } = await axios.get(`/api/v1/products/token/${product.token}`);
    if (data.countInStock < quantity) {
      toast.error('Product is out of stock');
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
    toast.error(error.response?.data?.message);
  }
};

export const countTotalItemsInCart = cartItems => cartItems.reduce((a, c) => a + c.quantity, 0);
export const countTotalPrice = cartItems => cartItems.reduce((a, c) => a + c.quantity * c.price, 0);

const round2 = num => Math.round(num * 100 + Number.EPSILON) / 100;
const calcTax = price => round2(0.18 * price);
const calcShipping = price => (price < 70 ? round2(0.05 * price) : round2(0.1 * price));

export const getOrderPrices = cartItems => {
  const itemsPrice = round2(countTotalPrice(cartItems));
  const taxPrice = calcTax(itemsPrice);
  const shippingPrice = calcShipping(itemsPrice);
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  return { itemsPrice, taxPrice, shippingPrice, totalPrice };
};

const orderSteps = [
  {
    active: false,
    text: 'Sign-In',
  },
  {
    active: false,
    text: 'Shipping',
  },
  {
    active: false,
    text: 'Payment',
  },
  {
    active: false,
    text: 'Place Order',
  },
];

export const createStepsCopy = () => orderSteps.map(step => ({ ...step }));
