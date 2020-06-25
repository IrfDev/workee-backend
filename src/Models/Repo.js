const mongoose = require('mongoose');

const RepoSchema = new mongoose.Schema({
    githubid: {
        type: String,
    },
    technologies: [{
        type: String,
        required: true,
    }, ],
});
module.exports = mongoose.model('Repo', RepoSchema);