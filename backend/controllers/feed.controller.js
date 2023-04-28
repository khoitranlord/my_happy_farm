const Feeds = require('./../models/feed.model');

const getFeeds = (req, res) => {
    Feeds.getFeeds((result) => {
        if (result === null) {
            res.status(500).send("Không thành công");
        } else {
            res.send(result);
        }
    })
}

module.exports = { getFeeds };