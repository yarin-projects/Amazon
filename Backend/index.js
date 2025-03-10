import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { errorHandler } from './src/middleware/error-handler.middleware.js';
import notFoudHandler from './src/middleware/not-found-handler.middleware.js';
import runServer from './src/middleware/run-server.middleware.js';
import seedRouter from './src/routers/seed.router.js';
import productRouter from './src/routers/product.router.js';
import userRouter from './src/routers/user.router.js';
import orderRouter from './src/routers/order.router.js';

config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/seed', seedRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);

app.use(errorHandler);
app.use(notFoudHandler);

runServer(app, process.env.MONGO_CONNECTION, PORT);
