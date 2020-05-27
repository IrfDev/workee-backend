const dynamoose = require('dynamoose');

const ResourceSchema = new dynamoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    url: {
        type: Object,
        schema: {
            site: String,
            url: String,
        },
    },
});

module.exports = dynamoose.model('Resource', ResourceSchema);