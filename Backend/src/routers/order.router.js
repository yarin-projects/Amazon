import { Router } from 'express';
import { isAuth } from '../middleware/auth.middleware.js';
import { addOrder, getOrderById } from '../controllers/order.controller.js';

const orderRoute = Router();

orderRoute.post('/', isAuth, addOrder);
orderRoute.get('/id/:id', isAuth, getOrderById);

export default orderRoute;
