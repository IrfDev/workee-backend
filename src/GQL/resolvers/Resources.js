const Resource = require('../../usecases/Resources');

const resolvers = {
    Query: {
        getAllResources: async() => await Resource.getAll(),
        getResourceById: async(_, { id }, ___) => await Resource.getById(id),
        getResourcesByTags: async(_, { tags }, ___) =>
            await Resource.getByTag(tags),
    },
    Mutation: {
        updateResource: async(_, { input }, ___) => {
            try {
                const updateResource = await Resource.updateResource(input.id, input);
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
        createResource: async(_, { input }, ___) => {
            try {
                const newResource = await Resource.create(input);
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
        pushFromResource: async(_, { id, tags }, ___) => {
            try {
                const resourceUpdated = await Resource.pushFromResource(id, tags);
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
        pullFromResource: async(_, { id, tags }, ___) => {
            try {
                const resourceUpdated = await Resource.pullFromResource(id, tags);
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