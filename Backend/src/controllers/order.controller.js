import Order from '../models/order.model.js';

export const addOrder = async (req, res) => {
  await Order.create({
    orderItems: req.body.orderItems.map(item => ({ ...item, product: item._id })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
  });

  return res.status(201).send({ message: 'New Order Confirmed' });
};
