const boardsSchema = require('./Boards');
const heroeSchema = require('./Heroes');
const notebookSchema = require('./Notebooks');
const projectSchema = require('./Projects');
const RepoSchema = require('./Repos');
const ResourceSchema = require('./Resources');
const StreamSchema = require('./Streams');
const TaskSchema = require('./Tasks');
const AuthSchema = require('./Auth');

module.exports = [
    boardsSchema,
    heroeSchema,
    notebookSchema,
    projectSchema,
    RepoSchema,
    ResourceSchema,
    StreamSchema,
    TaskSchema,
    AuthSchema,
];