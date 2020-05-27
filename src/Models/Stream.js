const dynamoose = require('dynamoose');

const streamFeedlySchema = new dynamoose.Schema({
    streamId: {
        type: String,
        required: true,
    },
    feedlyStreamsid: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
});
module.exports = dynamoose.model('Stream', streamFeedlySchema);