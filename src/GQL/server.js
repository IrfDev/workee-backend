const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');

const typeDefs = require('./schemas/index');
const resolvers = require('./resolvers/index');

const context = require('./context');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({ schema, resolvers, context });

module.exports = server;