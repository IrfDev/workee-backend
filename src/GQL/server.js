const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');

const responseCachePlugin = require('apollo-server-plugin-response-cache');

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
    context: async({ req }) => {
        if (!req.headers.authorization) return { auth: context.auth };
        let auth = await context.auth.usecases.isAuthenticated(
            req.headers.authorization,
        );

        if (auth === true) {
            return {
                ...context,
                token: req.headers.authorization,
                microsoftAuth: req.user,
            };
        } else {
            return {
                auth: context.auth,
            };
        }
    },
    playground: {
        settings: {
            'request.credentials': 'include',
        },
    },
    plugins: [responseCachePlugin()],
});

module.exports = server;