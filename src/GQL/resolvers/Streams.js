const Stream = require('../../usecases/Streams');

const resolvers = {
    Stream: {
        feedlyStreams: async() => await Stream.getFeedsFromFeedly(),
        feedlyItems: async(stream) => {
            const feedlyItems = await stream.feedlyItems.map((collectionId) => {
                const streamObject = Stream.getStreamsFromFeedly(collectionId);
                return streamObject.items;
            });
            return feedlyItems;
        },
    },
    Query: {
        getAllStreams: async() => await Stream.getAll(),
        getStreamById: async(_, { id }, ___) => await Stream.getById(id),
        getStreamsByTag: async(_, { tags }, ___) => await Stream.getByTag(tags),
        getFeedsFromFeedly: async() => await Stream.getFeedsFromFeedly(),
        getStreamsFromFeedly: async(_, { id }) =>
            await Stream.getStreamsFromFeedly(id),
    },
    Mutation: {
        updateStream: async(_, { input }, ___) => {
            try {
                const updatedStream = await Stream.updateStream(input.id, input);
                return {
                    success: true,
                    message: `Stream updated ${updatedProject}`,
                    data: updatedStream,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `can't update`,
                    data: error,
                };
            }
        },
        createStream: async(_, { input }, ___) => {
            try {
                const createdStream = await Stream.create(input);
                return {
                    success: true,
                    message: `Stream created ${updatedProject}`,
                    data: createdStream,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `can't create the stream object`,
                    data: error,
                };
            }
        },
        pushFromStream: async(_, { id, tags }, ___) => {
            try {
                const updatedStream = await Stream.pushFromStream(id, tags);
                return {
                    success: true,
                    message: `Stream updated ${updatedProject}`,
                    data: updatedStream,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `can't update`,
                    data: error,
                };
            }
        },
        pullFromStream: async(_, { id, tags }, ___) => {
            try {
                const updatedStream = await Stream.pullFromStream(id, tags);
                return {
                    success: true,
                    message: `Stream updated ${updatedProject}`,
                    data: updatedStream,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `can't update`,
                    data: error,
                };
            }
        },
    },
};

module.exports = resolvers;