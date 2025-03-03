import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Product = ({ product }) => {
  const productLink = `/product/${product.token}`;
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
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
