const mongoose = require('mongoose');

const RepoSchema = new mongoose.Schema({
    githubId: {
        type: String,
        required: true,
    },
    technologies: [{
        type: String,
        required: true,
    }, ],
});
module.exports = mongoose.model('Repo', RepoSchema);