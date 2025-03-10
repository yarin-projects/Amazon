import Title from '../components/shared/title';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext } from 'react';
import { Store } from '../store';
import ItemsInCart from '../components/cart/ItemsInCart';
import Checkout from '../components/cart/Checkout';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  const navigate = useNavigate();
  const updateCartHandler = async (item, quantity) => {
    try {
      const { data: product } = await axios.get(`/api/v1/products/token/${item.token}`);
      if (product.countInStock < quantity) {
        toast.error('Product is out of stock');
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
  const removeItemHandler = item => {
    dispatch({ type: REMOVE_FROM_CART, payload: item });
  };
  const checkoutHandler = () => {
    navigate('/signin?redirect=shipping');
  };
  return (
    <>
      <Title title="Shopping Cart" />
      <Row>
        <Col md={8}>
          <ItemsInCart
            cartItems={cartItems}
            RemoveItemHandler={removeItemHandler}
            updateCartHandler={updateCartHandler}
          />
        </Col>
        <Col md={4}>
          <Checkout cartItems={cartItems} checkoutHandler={checkoutHandler} />
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
