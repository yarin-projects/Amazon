import { useNavigate } from 'react-router-dom';
import { Store } from '../store';
import { useContext, useEffect, useState } from 'react';
import { SAVE_SHIPPING_INFO } from '../actions';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Title from '../components/shared/title';
import CheckoutSteps from '../components/shared/checkout-steps';
import { createStepsCopy } from '../utils';

const ShippingPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const { cartItems, shippingAddress } = cart;

  const [shippingInfo, setShippingInfo] = useState({
    fullName: shippingAddress.fullName || '',
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || '',
  });

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    } else if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems.length, navigate, userInfo]);

  const submitHandler = event => {
    event.preventDefault();
    dispatch({ type: SAVE_SHIPPING_INFO, payload: shippingInfo });
    navigate('/payment');
  };
  const steps = createStepsCopy();
  steps[0].active = true;
  steps[1].active = true;
  return (
    <>
      <Title title="Shipping" />
      <CheckoutSteps steps={steps} />
      <Container>
        <h1 className="my-3">Shipping Info</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={shippingInfo.fullName}
              onChange={e =>
                setShippingInfo(prevState => {
                  return { ...prevState, fullName: e.target.value };
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={shippingInfo.address}
              onChange={e =>
                setShippingInfo(prevState => {
                  return { ...prevState, address: e.target.value };
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={shippingInfo.city}
              onChange={e =>
                setShippingInfo(prevState => {
                  return { ...prevState, city: e.target.value };
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              name="postalCode"
              value={shippingInfo.postalCode}
              onChange={e =>
                setShippingInfo(prevState => {
                  return { ...prevState, postalCode: e.target.value };
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              name="country"
              value={shippingInfo.country}
              onChange={e =>
                setShippingInfo(prevState => {
                  return { ...prevState, country: e.target.value };
                })
              }
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="warning" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default ShippingPage;
