import { Router } from 'express';
import { seedData } from '../controllers/seedController';

const seedRouter = Router();

seedRouter.get('/', seedData);

export default seedRouter;
