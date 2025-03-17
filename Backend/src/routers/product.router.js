import { Router } from 'express';
import {
  getProducts,
  getProductByToken,
  getProductCategories,
} from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/token/:token', getProductByToken);
productRouter.get('/categories', getProductCategories);

export default productRouter;
