import Title from '../components/shared/title';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CartPage = () => {
  return (
    <>
      <Title title="Shopping Cart" />
      <Row>
        <Col md={8}>{/* <ItemsInCart /> */}</Col>
        <Col md={4}>{/* <Checkout /> */}</Col>
      </Row>
    </>
  );
};

export default CartPage;
