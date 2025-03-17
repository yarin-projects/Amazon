import { Router } from 'express';
import {
  getProducts,
  getProductByToken,
  getProductCategories,
  getProductsByQuery,
} from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/search', getProductsByQuery);
productRouter.get('/categories', getProductCategories);
productRouter.get('/token/:token', getProductByToken);

export default productRouter;
