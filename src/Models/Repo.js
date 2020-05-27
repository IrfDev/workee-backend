const dynamoose = require('dynamoose');

const RepoSchema = new dynamoose.Schema({
    githubid: {
        type: String,
    },
    technologies: {
        type: Array,
        required: true,
    },
});
module.exports = dynamoose.model('Repo', RepoSchema);