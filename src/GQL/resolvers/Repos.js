const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Repo: {
        githubRepo: async(repo, _, ctx) => {
            if (!ctx.repos) throw new AuthenticationError('Unauthorized!');

            const githubRepos = await ctx.repos.usecases.getAllRepos();
            const repoFinded = await githubRepos.find((githubRepo) => {
                return githubRepo.id.toString() === repo.githubId;
            });
            return repoFinded;
        },
    },

    Query: {
        getAllRepos: async(_, __, ctx) => {
            if (!ctx.repos) throw new AuthenticationError('Unauthorized!');

            return await ctx.repos.usecases.getAll();
        },

        getRepoById: async(_, { id }, ctx) => {
            if (!ctx.repos) throw new AuthenticationError('Unauthorized!');

            return await ctx.repos.usecases.getById(id);
        },

        getReposByTechnology: async(_, { technologies }, ctx) => {
            if (!ctx.repos) throw new AuthenticationError('Unauthorized!');

            return await ctx.repos.usecases.getByTechnology(technologies);
        },

        getAllGithubRepos: async(_, __, ctx) => {
            if (!ctx.repos) throw new AuthenticationError('Unauthorized!');

            return await ctx.repos.usecases.getAllRepos();
        },
    },
    Mutation: {
        updateRepo: async(_, { input }, ctx) => {
            if (!ctx.repos) throw new AuthenticationError('Unauthorized!');

            try {
                const updatedProject = await ctx.repos.usecases.updateRepo(
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
            if (!ctx.repos) throw new AuthenticationError('Unauthorized!');
            try {
                const updatedProject = await ctx.repos.usecases.create(input);
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
            if (!ctx.repos) throw new AuthenticationError('Unauthorized!');
            try {
                const updatedProject = await ctx.repos.usecases.pullFromRepo(
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
            if (!ctx.repos) throw new AuthenticationError('Unauthorized!');
            try {
                const updatedProject = await ctx.repos.usecases.pushFromRepo(
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