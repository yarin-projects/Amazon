import { Router } from 'express';
import { isAuth } from '../middleware/auth.middleware.js';
import { addOrder } from '../controllers/order.controller.js';

const orderRoute = Router();

orderRoute.get('/', isAuth, addOrder);

export default orderRoute;
