const { AuthenticationError } = require('apollo-server');

const resolvers = {
    Stream: {
        feedlyStreams: async(_, __, ctx) => {
            if (!ctx.streams) throw new AuthenticationError('Unauthorized!');
            return await ctx.streams.usecases.getFeedsFromFeedly();
        },

        feedlyItems: async(stream, _, ctx) => {
            if (!ctx.streams) throw new AuthenticationError('Unauthorized!');
            const feedlyItems = await stream.feedlyStreamsid.map((collectionId) => {
                const streamObject = ctx.streams.usecases.getStreamsFromFeedly(
                    collectionId,
                );

                console.log(streamObject);
                return streamObject.items;
            });

            console.log(feedlyItems);

            return feedlyItems;
        },
    },
    Query: {
        getAllStreams: async(_, __, ctx) => {
            if (!ctx.streams) throw new AuthenticationError('Unauthorized!');
            return await ctx.streams.usecases.getAll();
        },

        getStreamById: async(_, { id }, ctx) => {
            if (!ctx.streams) throw new AuthenticationError('Unauthorized!');
            return await ctx.streams.usecases.getById(id);
        },

        getStreamsByTag: async(_, { tags }, ctx) => {
            if (!ctx.streams) throw new AuthenticationError('Unauthorized!');
            return await ctx.streams.usecases.getByTag(tags);
        },

        getFeedsFromFeedly: async(_, __, ctx) => {
            if (!ctx.streams) throw new AuthenticationError('Unauthorized!');
            return await ctx.streams.usecases.getFeedsFromFeedly();
        },

        getStreamsFromFeedly: async(_, { id }, ctx) => {
            if (!ctx.streams) throw new AuthenticationError('Unauthorized!');
            return await ctx.streams.usecases.getStreamsFromFeedly(id);
        },
    },
    Mutation: {
        updateStream: async(_, { input }, ctx) => {
            if (!ctx.streams) throw new AuthenticationError('Unauthorized!');
            try {
                const updatedStream = await ctx.streams.usecases.updateStream(
                    input.id,
                    input,
                );
                return {
                    success: true,
                    message: `Stream updated ${updatedStream}`,
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

        createStream: async(_, { input }, ctx) => {
            if (!ctx.streams) throw new AuthenticationError('Unauthorized!');
            try {
                const createdStream = await ctx.streams.usecases.create(input);
                return {
                    success: true,
                    message: `Stream created ${createdStream}`,
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

        pushFromStream: async(_, { id, tags }, ctx) => {
            if (!ctx.streams) throw new AuthenticationError('Unauthorized!');
            try {
                const updatedStream = await ctx.streams.usecases.pushFromStream(
                    id,
                    tags,
                );
                return {
                    success: true,
                    message: `Stream updated ${updatedStream}`,
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

        pullFromStream: async(_, { id, tags }, ctx) => {
            if (!ctx.streams) throw new AuthenticationError('Unauthorized!');
            try {
                const updatedStream = await ctx.streams.usecases.pullFromStream(
                    id,
                    tags,
                );
                return {
                    success: true,
                    message: `Stream updated ${updatedStream}`,
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