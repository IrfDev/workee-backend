const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schemas/index');

const server = new ApolloServer({ typeDefs });

module.exports = server;