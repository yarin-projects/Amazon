import { Router } from 'express';
import { signUp } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/signup', signUp);

export default userRouter;
