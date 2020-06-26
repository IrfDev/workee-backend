const Stream = require('../../usecases/Streams');

const resolvers = {
    Query: {
        getAllStreams: async() => await Stream.getAll(),
        getStreamById: async(_, __, { id }, ___) => await Stream.getById(id),
        getStreamsByTag: async(_, __, { tags }, ___) =>
            await Stream.getByTechnology(tags),
        getFeedsFromFeedly: async() => await Stream.getFeedsFromFeedly(),
        getStreamsFromFeedly: async(_, __, { id }) =>
            await Stream.getStreamsFromFeedly(id),
    },
    Mutation: {
        updateStream: async(_, __, { input }, ___) =>
            await Stream.updateStream(input.id, input),
        createStream: async(_, __, { input }, ___) => await Stream.create(input),
        pushFromStream: async(_, __, { id, tags }, ___) =>
            await Stream.pullFromStream(id, tags),
        pullFromStream: async(_, __, { id, tags }, ___) =>
            await Stream.pushFromStream(id, tags),
    },
};

module.exports = resolvers;