import Order from '../models/order.model.js';

export const addOrder = async (req, res) => {
  const newOrder = await Order.create({
    orderItems: req.body.orderItems.map(item => ({ ...item, product: item._id })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
  });

  return res.status(201).send({ message: 'New Order Confirmed', order: newOrder });
};

export const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    return next(generateCustomError(404, 'Order Not Found'));
  }

  return res.status(200).send(order);
};
