const dynamoose = require('dynamoose');

const TaskSchema = new dynamoose.Schema({
    resourceid: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
});
module.exports = dynamoose.model('Task', TaskSchema);