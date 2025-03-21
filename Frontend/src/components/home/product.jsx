import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Rating from '../shared/rating';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { Store } from '../../store';
import { addToCartHandler } from '../../utils';

const Product = ({ product }) => {
  const productLink = `/product/${product.token}`;
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  return (
    <Card className="product-card">
      <Link to={productLink}>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ padding: '20px' }}
          alt={product.token}
        />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={productLink}>{product.title}</Link>
        </Card.Title>
        <Rating rating={product.rating.rate} numReviews={product.rating.count} />
        <Card.Text>
          <strong>${product.price}</strong>
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled className="mb-2 mt-auto">
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(product, cartItems, dispatch)}
            variant="warning"
            className="mb-2 mt-auto"
          >
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
