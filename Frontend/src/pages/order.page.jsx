import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useRequest from '../hooks/use-request';
import { Store } from '../store';
import Loading from '../components/shared/loading';
import MessageBox from '../components/shared/message-box';
import Title from '../components/shared/title';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const OrderPage = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: order,
  } = useRequest(`/api/v1/orders/${orderId}`, {
    headers: {
      authorization: `Bearer ${userInfo?.token}`,
    },
  });
  if (!userInfo) {
    navigate('/signin');
    return null;
  }
  return (
    <div>
      {' '}
      {isLoading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          {' '}
          <Title title="Order" />{' '}
          <h1 className="my-3"> Order: {order._id.substr(order._id.length - 6)} </h1>{' '}
          <Row>
            {' '}
            <Col md={8}>
              {' '}
              <Card className="mb-3">
                {' '}
                <Card.Body>
                  {' '}
                  <Card.Title>Shipping</Card.Title>{' '}
                  <Card.Text>
                    {' '}
                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />{' '}
                    <strong>Address:</strong> {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city}, {order.shippingAddress.country},{' '}
                    {order.shippingAddress.postalCode}{' '}
                  </Card.Text>{' '}
                  {order.isDelivered ? (
                    <MessageBox variant="success"> Delivered at {order.deliveredAt} </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Delivered</MessageBox>
                  )}{' '}
                </Card.Body>{' '}
              </Card>{' '}
              <Card className="mb-3">
                {' '}
                <Card.Body>
                  {' '}
                  <Card.Title>Payment</Card.Title>{' '}
                  <Card.Text>
                    {' '}
                    <strong>Method:</strong> {order.paymentMethod}{' '}
                  </Card.Text>{' '}
                  {order.isPaid ? (
                    <MessageBox variant="success"> Paid at {order.paidAt} </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Paid</MessageBox>
                  )}{' '}
                </Card.Body>{' '}
              </Card>{' '}
              <Card className="mb-3">
                {' '}
                <Card.Body>
                  {' '}
                  <Card.Title>Items</Card.Title>{' '}
                  <ul>
                    {' '}
                    {order.orderItems.map(item => (
                      <li key={item._id}>
                        {' '}
                        <Row className="align-items-center">
                          {' '}
                          <Col md={6}>
                            {' '}
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid rounded img-thumbnail"
                            ></img>{' '}
                            <Link to={`/product/${item.token}`}> {item.title} </Link>{' '}
                          </Col>{' '}
                          <Col md={3}>
                            {' '}
                            <span>{item.quantity}</span>{' '}
                          </Col>{' '}
                          <Col md={3}>${item.price}</Col>{' '}
                        </Row>{' '}
                      </li>
                    ))}{' '}
                  </ul>{' '}
                </Card.Body>{' '}
              </Card>{' '}
            </Col>{' '}
            <Col md={4}>
              {' '}
              <Card className="mb-3">
                {' '}
                <Card.Body>
                  {' '}
                  <Card.Title>Order Summary</Card.Title>{' '}
                  <ul>
                    {' '}
                    <li>
                      {' '}
                      <Row>
                        {' '}
                        <Col>Items</Col> <Col>${order.itemsPrice.toFixed(2)}</Col>{' '}
                      </Row>{' '}
                    </li>{' '}
                    <li>
                      {' '}
                      <Row>
                        {' '}
                        <Col>Shipping</Col> <Col>${order.shippingPrice.toFixed(2)}</Col>{' '}
                      </Row>{' '}
                    </li>{' '}
                    <li>
                      {' '}
                      <Row>
                        {' '}
                        <Col>Tax</Col> <Col>${order.taxPrice.toFixed(2)}</Col>{' '}
                      </Row>{' '}
                    </li>{' '}
                    <li>
                      {' '}
                      <Row>
                        {' '}
                        <Col>
                          {' '}
                          <strong>Order Total</strong>{' '}
                        </Col>{' '}
                        <Col>
                          {' '}
                          <strong>${order.totalPrice.toFixed(2)}</strong>{' '}
                        </Col>{' '}
                      </Row>{' '}
                    </li>{' '}
                  </ul>{' '}
                </Card.Body>{' '}
              </Card>{' '}
            </Col>{' '}
          </Row>{' '}
        </div>
      )}{' '}
    </div>
  );
};

export default OrderPage;
