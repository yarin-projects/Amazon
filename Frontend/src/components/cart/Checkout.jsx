import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { countTotalItemsInCart, countTotalPrice } from '../../utils';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const Checkout = ({ cartItems, checkoutHandler }) => {
  return (
    <Card>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>
              Subtotal ({countTotalItemsInCart(cartItems)} Items): $
              {countTotalPrice(cartItems).toFixed(2)}
            </h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-grid">
              <Button
                type="button"
                variant="warning"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Checkout
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  checkoutHandler: PropTypes.func,
};

export default Checkout;
