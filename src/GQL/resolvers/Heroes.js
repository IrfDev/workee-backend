const resolvers = {
    Query: {
        getAllHeroes: async(_, __, ctx) => await ctx.heros.usecases.getAll(),
        getHeroeById: async(_, args, ctx) =>
            await ctx.heros.usecases.getById(args.id),
        getHeroesByTags: async(_, { tags }, ctx) =>
            await ctx.heros.usecases.getByTag(tags),
        getHeroesByName: async(_, { name }, ctx) =>
            await ctx.heros.usecases.getByName(name),
    },
    Mutation: {
        updateHeroe: async(_, { input }, ctx) => {
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
            try {
                console.log(id);
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