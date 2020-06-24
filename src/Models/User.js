const dynamoose = require('dynamoose');

const TaskSchema = new dynamoose.Schema({
    email: {
        type: String,
        required: true,
        rangeKey: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
});
module.exports = dynamoose.model('User', TaskSchema);