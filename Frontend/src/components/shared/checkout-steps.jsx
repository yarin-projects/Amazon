import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { orderSteps } from '../../utils';

const CheckoutSteps = () => {
  return (
    <Row className="checkout-steps text-center">
      {orderSteps.map(step => (
        <Col key={step.text} className={step.active ? 'active' : ''}>
          {step.text}
        </Col>
      ))}
    </Row>
  );
};

export default CheckoutSteps;
