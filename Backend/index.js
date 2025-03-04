import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { errorHandler } from './middleware/error-handler.js';
import notFoudHandler from './middleware/not-found-handler.js';
import runServer from './middleware/run-server.js';
import seedRouter from './routers/seed.router.js';
import productRouter from './routers/product.router.js';
import userRouter from './routers/user.router.js';

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

app.use(errorHandler);
app.use(notFoudHandler);

runServer(app, process.env.MONGO_CONNECTION, PORT);
