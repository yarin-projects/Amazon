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

export const extractParamsFromSearchUri = searchUri => {
  const searchParams = new URLSearchParams(searchUri);
  const category = searchParams.get('category') || 'all';
  const query = searchParams.get('query') || 'all';
  const price = searchParams.get('price') || 'all';
  const rating = searchParams.get('rating') || 'all';
  const order = searchParams.get('order') || '';
  const page = searchParams.get('page') || 1;
  return { category, query, price, rating, order, page };
};

export const getFilterUrl = (searchUri, filter) => {
  const { category, query, price, rating, order, page } = extractParamsFromSearchUri(searchUri);
  const filterCategory = filter.category || category;
  const filterQuery = filter.query || query;
  const filterPrice = filter.price || price;
  const filterRating = filter.rating || rating;
  const sortOrder = filter.order || order;
  const filterPage = filter.page || page;

  return buildSearchQuery(
    filterCategory,
    filterQuery,
    filterPrice,
    filterRating,
    sortOrder,
    filterPage
  );
};

export const buildSearchQuery = (category, query, price, rating, order, page) => {
  return `/search?category=${category}&query=${query}&price=${price}&rating=${rating}&order=${order}&page=${page}`;
};

export const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$50 to $200',
    value: '50-200',
  },
  {
    name: '$200 to $1000',
    value: '200-1000',
  },
];

export const rates = [
  {
    name: '4 stars & up',
    rating: 4,
  },
  {
    name: '3 stars & up',
    rating: 3,
  },
  {
    name: '2 stars & up',
    rating: 2,
  },
  {
    name: '1 stars & up',
    rating: 1,
  },
];
