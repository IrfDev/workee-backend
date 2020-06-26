const { makeExecutableSchema } = require('apollo-server-express');

const boardsSchema = require('../schemas/Boards');
const heroeSchema = require('../schemas/Heroes');
const notebookSchema = require('../schemas/Notebooks');
const projectSchema = require('../schemas/Projects');
const RepoSchema = require('../schemas/Repos');
const ResourceSchema = require('../schemas/Resources');
const StreamSchema = require('../schemas/Streams');
const TaskSchema = require('../schemas/Tasks');

module.exports = {
    ...boardsSchema,
    ...heroeSchema,
    ...notebookSchema,
    ...projectSchema,
    ...TaskSchema,
    ...StreamSchema,
    ...ResourceSchema,
    ...RepoSchema,
};