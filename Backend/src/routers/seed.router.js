import { Router } from 'express';
import { seedData } from '../controllers/seed.controller.js';

const seedRouter = Router();

seedRouter.get('/', seedData);

export default seedRouter;
