import { Router } from 'express';
import { seedData } from '../controllers/seedController.js';

const seedRouter = Router();

seedRouter.get('/', seedData);

export default seedRouter;
