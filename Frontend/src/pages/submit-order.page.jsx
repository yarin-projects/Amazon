import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../store';
import axios from 'axios';
import { createStepsCopy, getOrderPrices } from '../utils';
import { toast } from 'react-toastify';
import { CLEAR_CART } from '../actions';
import Title from '../components/shared/title';
import CheckoutSteps from '../components/shared/checkout-steps';
import Loading from '../components/shared/loading';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

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

  const { itemsPrice, taxPrice, shippingPrice, totalPrice } = getOrderPrices(cartItems);
  const submitOrderHandler = async () => {
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
  const steps = createStepsCopy();
  steps.forEach(step => (step.active = true));
  return (
    <div>
      <Title title="Order Summary" />
      <CheckoutSteps steps={steps} />
      <h1 className="my-3">Order Summary</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong> {shippingAddress.fullName} <br />
                <strong>Address: </strong> {shippingAddress.address} <br />
                <strong>City: </strong> {shippingAddress.city} <br />
                <strong>Postal Code: </strong> {shippingAddress.postalCode} <br />
                <strong>Country: </strong> {shippingAddress.country} <br />
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong> {paymentMethod} <br />
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                <Row className="text-center mb-3">
                  <Col md={6} className="image-container">
                    Description
                  </Col>
                  <Col md={3}>Quantity</Col>
                  <Col md={3}>Price</Col>
                </Row>

                {cartItems.map(item => (
                  <ListGroup key={item._id}>
                    <Row className="text-center">
                      <Col md={6} className="image-container">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail mb-2"
                        ></img>{' '}
                        <Link to={`/product/${item.token}`} className="btn btn-light">
                          {item.title}
                        </Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup>
                ))}
              </ListGroup>
              <Link to="/cart" className="btn btn-light my-3">
                Edit cart
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row className="align-items-center mb-3">
                    <Col>Items</Col>
                    <Col>${itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total</strong>
                    </Col>
                    <Col>
                      <strong>${totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={submitOrderHandler}
                      disabled={cart.cartItems.length === 0}
                      variant="warning"
                    >
                      Place Order
                    </Button>
                  </div>
                  {isLoading && <Loading />}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SubmitOrderPage;
