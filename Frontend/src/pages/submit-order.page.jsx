import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../store';
import axios from 'axios';
import { calcShipping, calcTax, countTotalPrice, round2 } from '../utils';
import { toast } from 'react-toastify';
import { CLEAR_CART } from '../actions';

const SubmitOrderPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    } else if (!shippingAddress) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    } else if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate, userInfo, shippingAddress, paymentMethod]);

  const itemsPrice = round2(countTotalPrice(cartItems));
  const taxPrice = calcTax(itemsPrice);
  const shippingPrice = calcShipping(itemsPrice);
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  const submitHandler = async event => {
    event.preventDefualt();
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        '/api/v1/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: CLEAR_CART });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return <div></div>;
};

export default SubmitOrderPage;
