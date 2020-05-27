const dynamoose = require('dynamoose');

const boardSchema = new dynamoose.Schema({
    resourceid: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
});
module.exports = dynamoose.model('Board', boardSchema);