const { ApolloError } = require('apollo-server-express');

const resolvers = {
    Query: {
        getAllHeroes: async(_, __, ctx) => {
            if (!ctx.heros) throw new ApolloError('Unauthorized!');
            return await ctx.heros.usecases.getAll();
        },

        getHeroeById: async(_, args, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            return await ctx.heros.usecases.getById(args.id);
        },

        getHeroesByTags: async(_, { tags }, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            return await ctx.heros.usecases.getByTag(tags);
        },

        getHeroesByName: async(_, { name }, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            return await ctx.heros.usecases.getByName(name);
        },
    },
    Mutation: {
        updateHeroe: async(_, { input }, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            try {
                const updatedHero = await ctx.heros.usecases.updateHero(
                    input.id,
                    input,
                );
                return {
                    success: true,
                    message: 'Updated Hero',
                    data: updatedHero,
                };
            } catch (error) {
                return {
                    success: false,
                    message: "Can't create hero",
                    data: error,
                };
            }
        },

        async createHeroe(_, { input }, ctx) {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            try {
                const newHero = await ctx.heros.usecases.create(input);
                return {
                    success: true,
                    message: 'New Heroe created',
                    data: newHero,
                };
            } catch (error) {
                return {
                    success: false,
                    message: "Can't create hero",
                    data: error,
                };
            }
        },

        pushTagsInHeroe: async(_, { id, tags }, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            try {
                const updatedHero = await ctx.heros.usecases.pushTagsHero(id, tags);
                return {
                    success: true,
                    message: `Succesfully push ${tags} into ${id}`,
                    data: updatedHero,
                };
            } catch (error) {
                return {
                    success: false,
                    message: "Can't create hero",
                    data: error,
                };
            }
        },

        pullTagsFromHeroe: async(_, { id, tags }, ctx) => {
            try {
                const updatedHero = await ctx.heros.usecases.pullTagsHero(id, tags);
                return {
                    success: true,
                    message: `Succesfully pull ${tags} from ${id}`,
                    data: updatedHero,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `Can't pull tags from ${id}`,
                    data: error,
                };
            }
        },
    },
};

module.exports = resolvers;