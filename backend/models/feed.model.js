const database = require('./../controllers/connection');

var Feeds = function (data) {
    this.id_feed = data.id_feed;
    this.feed_name = data.feed_name;
    this.io_key = data.io_key;
}

Feeds.getFeeds = (result) => {
    database.query(
        "select * from io_feed",
        (error, feeds) => {
            if (error || feeds.length === 0) {
                result(null);
            } else {
                result(feeds);
            }
        } 
    )
}

module.exports = Feeds;