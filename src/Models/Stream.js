const mongoose = require('mongoose');

const streamFeedlySchema = new mongoose.Schema({
    feedlyStreamsid: [{
        type: String,
        required: true,
    }, ],
    tags: [{
        type: Array,
        required: true,
    }, ],
});
module.exports = mongoose.model('Stream', streamFeedlySchema);