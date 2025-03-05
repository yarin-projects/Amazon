import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../shared/rating';

const ProductDescription = ({ title, rating, price, description }) => {
  return (
    <ListGroup>
      <ListGroup.Item>
        <h1 style={{ wordWrap: 'break-word' }}>{title}</h1>
      </ListGroup.Item>
      <ListGroup.Item>
        <Rating rating={rating.rate} numReviews={rating.count} />
      </ListGroup.Item>
      <ListGroup.Item>
        <h3>${price}</h3>
      </ListGroup.Item>
      <ListGroup.Item>
        Description:{' '}
        <p style={{ wordWrap: 'break-word' }} className="lead">
          {description}
        </p>
      </ListGroup.Item>
    </ListGroup>
  );
};

ProductDescription.propTypes = {
  title: PropTypes.string,
  rating: PropTypes.object,
  price: PropTypes.number,
  description: PropTypes.string,
};

export default ProductDescription;
