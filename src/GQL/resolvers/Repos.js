const Repo = require('../../usecases/Repos');

const resolvers = {
    Repo: {
        githubRepo: async(repo, _, ctx) => {
            const githubRepos = await ctx.repos.usecases.getAllRepos();
            return githubRepos.find((githubRepo) => githubRepo.id === repo.githubId);
        },
    },
    Query: {
        getAllRepos: async(_, __, ctx) => await ctx.repos.usecasesgetAll(),

        getRepoById: async(_, { id }, ctx) => await ctx.repos.usecasesgetById(id),

        getReposByTechnology: async(_, { technologies }, ctx) =>
            await ctx.repos.usecasesgetByTechnology(technologies),

        getAllGithubRepos: async(_, __, ctx) =>
            await ctx.repos.usecasesgetAllRepos(),
    },
    Mutation: {
        updateRepo: async(_, { input }, ctx) => {
            try {
                const updatedProject = await ctx.repos.usecasesupdateRepo(
                    input.id,
                    input,
                );
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
        createRepo: async(_, { input }, ctx) => {
            try {
                const updatedProject = await ctx.repos.usecasescreate(input);
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
        pushFromRepo: async(_, { id, technologies }, ctx) => {
            try {
                const updatedProject = await ctx.repos.usecasespullFromRepo(
                    id,
                    technologies,
                );
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
        pullFromRepo: async(_, { id, technologies }, ctx) => {
            try {
                const updatedProject = await ctx.repos.usecasespushFromRepo(
                    id,
                    technologies,
                );
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