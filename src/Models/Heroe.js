const mongoose = require('mongoose');

const HeroeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    tags: [{
        type: String,
        required: true,
    }, ],
    links: [{
        website: String,
        urlLink: String,
    }, ],
});
module.exports = mongoose.model('Heroe', HeroeSchema);