import MessageBox from '../shared/message-box';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const ItemsInCart = ({ cartItems, updateCartHandler, RemoveItemHandler }) => {
  return (
    <>
      {cartItems.length === 0 ? (
        <MessageBox>
          Cart is empty. <Link to="/">Go Shopping</Link>
        </MessageBox>
      ) : (
        <ListGroup>
          {cartItems.map(item => {
            <ListGroup.Item key={item.token}>
              <Row className="align-items-center">
                <Col md={4}>
                  <img src={item.image} alt={item.title} className="img-fluid rounded" />{' '}
                  <Link to={`/product/${item.token}`}>{item.title}</Link>
                </Col>
                <Col md={3}>
                  <Button
                    variant="light"
                    onClick={() => updateCartHandler(item, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    <i className="fas fa-minus-circle" />
                  </Button>{' '}
                  <span>{item.quantity}</span>{' '}
                  <Button
                    variant="light"
                    onClick={() => updateCartHandler(item, item.quantity + 1)}
                    disabled={item.quantity === item.countInStock}
                  >
                    <i className="fas fa-plus-circle" />
                  </Button>
                </Col>
                <Col md={1}>${item.price * item.quantity}</Col>
                <Col md={1}>
                  <Button variant="light" onClick={() => RemoveItemHandler(item)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>;
          })}
        </ListGroup>
      )}
    </>
  );
};

ItemsInCart.propTypes = {
  cartItems: PropTypes.array,
  updateCartHandler: PropTypes.func,
  RemoveItemHandler: PropTypes.func,
};

export default ItemsInCart;
