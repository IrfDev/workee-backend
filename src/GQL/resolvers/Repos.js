const Repo = require('../../usecases/Repos');

const resolvers = {
    Repo: {
        githubRepo: async(repo) => {
            const githubRepos = await Repo.getAllRepos();
            return githubRepos.find((githubRepo) => githubRepo.id === repo.githubId);
        },
    },
    Query: {
        getAllRepos: async() => await Repo.getAll(),
        getRepoById: async(_, { id }, ___) => await Repo.getById(id),
        getReposByTechnology: async(_, { technologies }, ___) =>
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