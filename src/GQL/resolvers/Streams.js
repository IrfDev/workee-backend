const resolvers = {
    Stream: {
        feedlyStreams: async(_, __, ctx) =>
            await ctx.streams.usecases.getFeedsFromFeedly(),

        feedlyItems: async(stream, _, ctx) => {
            const feedlyItems = await stream.feedlyItems.map((collectionId) => {
                const streamObject = ctx.streams.usecases.getStreamsFromFeedly(
                    collectionId,
                );
                return streamObject.items;
            });
            return feedlyItems;
        },
    },
    Query: {
        getAllStreams: async(_, __, ctx) => await ctx.streams.usecases.getAll(),

        getStreamById: async(_, { id }, ctx) =>
            await ctx.streams.usecases.getById(id),

        getStreamsByTag: async(_, { tags }, ctx) =>
            await ctx.streams.usecases.getByTag(tags),

        getFeedsFromFeedly: async(_, __, ctx) =>
            await ctx.streams.usecases.getFeedsFromFeedly(),

        getStreamsFromFeedly: async(_, { id }, ctx) =>
            await ctx.streams.usecases.getStreamsFromFeedly(id),
    },
    Mutation: {
        updateStream: async(_, { input }, ctx) => {
            try {
                const updatedStream = await ctx.streams.usecases.updateStream(
                    input.id,
                    input,
                );
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
        createStream: async(_, { input }, ctx) => {
            try {
                const createdStream = await ctx.streams.usecases.create(input);
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
        pushFromStream: async(_, { id, tags }, ctx) => {
            try {
                const updatedStream = await ctx.streams.usecases.pushFromStream(
                    id,
                    tags,
                );
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
        pullFromStream: async(_, { id, tags }, ctx) => {
            try {
                const updatedStream = await ctx.streams.usecases.pullFromStream(
                    id,
                    tags,
                );
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