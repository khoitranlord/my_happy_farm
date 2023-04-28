const express = require('express');
const feedRouter = express.Router();

const { getFeeds } = require('./../controllers/feed.controller');

feedRouter.get('/feeds', getFeeds);

module.exports = feedRouter;