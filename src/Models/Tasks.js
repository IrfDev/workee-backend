const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    resource: {
        type: [String, Object],
        required: true,
    },
    tags: [{
        type: String,
        required: true,
    }, ],
    type: {
        enum: ['todo', 'manual'],
    },
});
module.exports = mongoose.model('Task', TaskSchema);