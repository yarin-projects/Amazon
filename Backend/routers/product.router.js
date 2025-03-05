import { Router } from 'express';
import { getProducts, getProductByToken } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/token/:token', getProductByToken);

export default productRouter;
