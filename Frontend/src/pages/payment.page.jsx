import { useNavigate } from 'react-router-dom';
import { Store } from '../store';
import { useContext, useEffect, useState } from 'react';
import { SAVE_PAYMENT_METHOD } from '../actions';
import Title from '../components/shared/title';
import CheckoutSteps from '../components/shared/checkout-steps';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { orderSteps } from '../utils';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'PayPal');

  const submitHandler = event => {
    event.preventDefault();
    dispatch({ type: SAVE_PAYMENT_METHOD, payload: paymentMethodName });
    navigate('/placeorder');
  };

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate('/cart');
    }
    if (!userInfo) {
      navigate('/signin?redirect=/payment');
    }

    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [userInfo, navigate, shippingAddress, cartItems]);

  const steps = orderSteps.map(step => ({ ...step }));
  steps[0].active = true;
  steps[1].active = true;
  steps[3].active = true;
  return (
    <>
      <Title title="Payment Method" />
      <CheckoutSteps steps={steps} />
      <Container className="small-container">
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="PayPal">
            <Form.Label>PayPal</Form.Label>
            <Form.Check
              type="radio"
              id="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={e => setPaymentMethodName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stripe">
            <Form.Label>Stripe</Form.Label>
            <Form.Check
              type="radio"
              id="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={e => setPaymentMethodName(e.target.value)}
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

export default PaymentPage;
