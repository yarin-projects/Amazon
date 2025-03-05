import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../store';
import { addToCartHandler } from '../utils';
import useRequest from '../hooks/use-request';
import Loading from '../components/shared/loading';
import MessageBox from '../components/shared/message-box';
import ProductDescription from '../components/product/product-description';
import CartDescription from '../components/product/cart-description';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProductPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  const { isLoading, error, data: product } = useRequest(`/api/v1/products/token/${token}`);
  const addToCart = async () => {
    await addToCartHandler(product, cartItems, dispatch);
    navigate('/cart');
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant={'danger'}>{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img src={product.image} alt={product.name} width={400} />
            </Col>
            <Col md={3}>
              <ProductDescription {...product} />
            </Col>
            <Col md={3}>
              <CartDescription product={product} addToCart={addToCart} />
            </Col>
          </Row>
        </div>
      )}
      ;
    </>
  );
};

export default ProductPage;
