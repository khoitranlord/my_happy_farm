const express = require('express');
const rootRoutes = express.Router();

const userRouter = require('./user.routes');
const feedRouter = require('./iofeed.routes');

rootRoutes.use('/user', userRouter);
rootRoutes.use('/feed', feedRouter);

module.exports = rootRoutes;