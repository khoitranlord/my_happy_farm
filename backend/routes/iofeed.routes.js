import { Router } from 'express';
const feedRouter = Router();

import { getFeeds } from './../controllers/feed.controller';

feedRouter.get('/feeds', getFeeds);

export default feedRouter;