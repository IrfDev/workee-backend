const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    resourceid: {
        type: String,
        required: true,
    },
    activeList: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
        required: true,
    }, ],
});
module.exports = mongoose.model('Board', boardSchema);