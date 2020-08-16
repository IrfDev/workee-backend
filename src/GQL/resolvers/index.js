const Auth = require('./Auth');
const Boards = require('./Boards');
const Heroes = require('./Heroes');
const Notebooks = require('./Notebooks');
const Projects = require('./Projects');
const Repos = require('./Repos');
const Resources = require('./Resources');
const Streams = require('./Streams');
const Tasks = require('./Tasks');

const { merge } = require('lodash');

const resolvers = merge(
    Auth,
    Boards,
    Heroes,
    Notebooks,
    Projects,
    Repos,
    Resources,
    Streams,
    Tasks,
);

module.exports = resolvers;