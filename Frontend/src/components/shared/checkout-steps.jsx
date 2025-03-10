import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

const CheckoutSteps = ({ steps }) => {
  return (
    <Row className="checkout-steps text-center">
      {steps.map(step => (
        <Col key={step.text} className={step.active ? 'active' : ''}>
          {step.text}
        </Col>
      ))}
    </Row>
  );
};

CheckoutSteps.propTypes = {
  steps: PropTypes.array,
};

export default CheckoutSteps;
