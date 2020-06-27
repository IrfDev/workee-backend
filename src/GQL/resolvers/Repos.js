const Repo = require('../../usecases/Repos');

const resolvers = {
    Query: {
        getAllRepos: async() => await Repo.getAll(),
        getRepoById: async(_, __, { id }, ___) => await Repo.getById(id),
        getReposByTechnology: async(_, __, { technologies }, ___) =>
            await Repo.getByTechnology(technologies),
        getAllGithubRepos: async() => await Repo.getAllRepos(),
    },
    Mutation: {
        updateRepo: async(_, { input }, ___) => {
            try {
                const updatedProject = await Repo.updateRepo(input.id, input);
                return {
                    success: true,
                    message: `Repo updated ${updatedProject}`,
                    data: updatedProject,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `can't update`,
                    data: error,
                };
            }
        },
        createRepo: async(_, { input }, ___) => {
            try {
                const updatedProject = await Repo.create(input);
                return {
                    success: true,
                    message: `Repo updated ${updatedProject}`,
                    data: updatedProject,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `can't update`,
                    data: error,
                };
            }
        },
        pushFromRepo: async(_, { id, technologies }, ___) => {
            try {
                const updatedProject = await Repo.pullFromRepo(id, technologies);
                return {
                    success: true,
                    message: `Repo updated ${updatedProject}`,
                    data: updatedProject,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `can't update`,
                    data: error,
                };
            }
        },
        pullFromRepo: async(_, { id, technologies }, ___) => {
            try {
                const updatedProject = await Repo.pushFromRepo(id, technologies);
                return {
                    success: true,
                    message: `Repo updated ${updatedProject}`,
                    data: updatedProject,
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