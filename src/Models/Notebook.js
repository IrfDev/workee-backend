const mongoose = require('mongoose');

const notebookSchema = new mongoose.Schema({
    onenoteId: {
        type: String,
        required: true,
    },
    sections: [{
        type: String,
    }, ],
    tags: {
        type: Array,
        required: true,
    },
    topics: {
        type: Array,
        required: true,
    },
});
module.exports = mongoose.model('Notebook', notebookSchema);