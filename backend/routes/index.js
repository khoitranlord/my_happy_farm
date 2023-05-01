import { Router } from 'express';
const rootRoutes = Router();

import userRouter from './user.routes';
import feedRouter from './iofeed.routes';

rootRoutes.use('/user', userRouter);
rootRoutes.use('/feed', feedRouter);

export default rootRoutes;