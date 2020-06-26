const Heroe = require('../../usecases/Heroes');

const resolvers = {
    Query: {
        getAllHeroes: async() => await Heroe.getAll(),
        getHeroeById: async(_, __, { id }, ___) => await Heroe.getById(id),
        getHeroesByTags: async(_, __, { tags }, ___) => await Heroe.getByTag(tags),
        getHeroesByName: async(_, __, { name }, ___) =>
            await Heroe.getByName(name),
    },
    Mutation: {
        updateHeroe: async(_, __, { input }, ___) =>
            await Heroe.updateHeroe(input.id, input),
        createHeroe: async(_, __, { input }, ___) => await Heroe.create(input),
        pushTagsInHeroe: async(_, __, { id, tags }, ___) =>
            await Heroe.pushTagsHeroe(id, tags),
        pullTagsInHeroe: async(_, __, { id, tags }, ___) =>
            await Heroe.pullTagsHeroe(id, tags),
    },
};

module.exports = resolvers;