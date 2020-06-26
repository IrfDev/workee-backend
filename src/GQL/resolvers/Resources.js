const Resource = require('../../usecases/Resources');

const resolvers = {
    Query: {
        getAllResources: async() => await Resource.getAll(),
        getResourceById: async(_, __, { id }, ___) => await Resource.getById(id),
        getResourcesByTags: async(_, __, { tags }, ___) =>
            await Resource.getByTag(tags),
    },
    Mutation: {
        updateResource: async(_, __, { input }, ___) =>
            await Resource.updateResource(input.id, input),
        createResource: async(_, __, { input }, ___) =>
            await Resource.create(input),
        pushFromResource: async(_, __, { id, tags }, ___) =>
            await Resource.pullFromResource(id, tags),
        pullFromResource: async(_, __, { id, tags }, ___) =>
            await Resource.pushFromResource(id, tags),
    },
};

module.exports = resolvers;