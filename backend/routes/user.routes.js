import { Router } from 'express';
const userRouter = Router();

import { login, register } from './../controllers/user.controller';

userRouter.post('/login', login)
userRouter.post('/register', register)

export default userRouter;