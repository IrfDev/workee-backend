const resolvers = {
    Query: {
        getAllResources: async(_, __, ctx) =>
            await ctx.resources.usecases.getAll(),
        getResourceById: async(_, { id }, ctx) =>
            await ctx.resources.usecases.getById(id),
        getResourcesByTags: async(_, { tags }, ctx) =>
            await ctx.resources.usecases.getByTag(tags),
    },
    Mutation: {
        updateResource: async(_, { input }, ctx) => {
            try {
                const updateResource = await ctx.resources.usecases.updateResource(
                    input.id,
                    input,
                );
                return {
                    success: true,
                    message: `Updated resource ${updateResource.id}`,
                    data: updateResource,
                };
            } catch (error) {
                return {
                    success: false,
                    message: "Can't create hero",
                    data: error,
                };
            }
        },
        createResource: async(_, { input }, ctx) => {
            try {
                const newResource = await ctx.resources.usecases.create(input);
                return {
                    success: true,
                    message: `New resource ${newResource.id}`,
                    data: newResource,
                };
            } catch (error) {
                return {
                    success: false,
                    message: 'New resource',
                    data: error,
                };
            }
        },
        pushFromResource: async(_, { id, tags }, ctx) => {
            try {
                const resourceUpdated = await ctx.resources.usecases.pushFromResource(
                    id,
                    tags,
                );
                return {
                    success: true,
                    message: `Push resource ${newResource.id}`,
                    data: resourceUpdated,
                };
            } catch (error) {
                return {
                    success: false,
                    message: "Can't create hero",
                    data: error,
                };
            }
        },
        pullFromResource: async(_, { id, tags }, ctx) => {
            try {
                const resourceUpdated = await ctx.resources.usecases.pullFromResource(
                    id,
                    tags,
                );
                return {
                    success: true,
                    message: `Pull resource ${newResource.id}`,
                    data: resourceUpdated,
                };
            } catch (error) {
                return {
                    success: false,
                    message: "Can't create hero",
                    data: error,
                };
            }
        },
    },
};

module.exports = resolvers;