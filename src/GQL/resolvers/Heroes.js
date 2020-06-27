const Heroe = require('../../usecases/Heroes');

const resolvers = {
    Query: {
        getAllHeroes: async() => await Heroe.getAll(),
        getHeroeById: async(_, args, ___) => await Heroe.getById(args.id),
        getHeroesByTags: async(_, { tags }, ___) => await Heroe.getByTag(tags),
        getHeroesByName: async(_, { name }, ___) => await Heroe.getByName(name),
    },
    Mutation: {
        updateHeroe: async(_, { input }, ___) => {
            try {
                console.log({ input });
                const updatedHero = await Heroe.updateHero(input.id, input);
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
        async createHeroe(_, { input }, ___) {
            try {
                const newHero = await Heroe.create(input);
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
        pushTagsInHeroe: async(_, { id, tags }, ___) => {
            try {
                console.log(id);
                const updatedHero = await Heroe.pushTagsHero(id, tags);
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
        pullTagsFromHeroe: async(_, { id, tags }, ___) => {
            try {
                const updatedHero = await Heroe.pullTagsHero(id, tags);
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