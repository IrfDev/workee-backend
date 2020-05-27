const dynamoose = require('dynamoose');

const notebookSchema = new dynamoose.Schema({
    onenoteId: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    topics: {
        type: Array,
        required: true,
    },
});
module.exports = dynamoose.model('Notebook', notebookSchema);