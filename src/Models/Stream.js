const mongoose = require('mongoose');

const streamFeedlySchema = new mongoose.Schema({
    streamId: {
        type: String,
        required: true,
    },
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