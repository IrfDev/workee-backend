const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
        required: true,
    }, ],
    website: {
        site: String,
        urlLink: String,
    },
});

module.exports = mongoose.model('Resource', ResourceSchema);