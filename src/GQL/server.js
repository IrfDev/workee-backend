const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');

const typeDefs = require('./schemas/index');
const resolvers = require('./resolvers/index');

const context = require('./context');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({
    schema,
    resolvers,
    context: ({ req }) => {
        return {
            ...context,
            token: req.headers.authorization,
            microsoftAuth: req.user,
        };
    },
    playground: {
        settings: {
            'request.credentials': 'include',
        },
    },
});

module.exports = server;