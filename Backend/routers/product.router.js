import { Router } from "express";
import { getProducts } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get("/", getProducts);

export default productRouter;