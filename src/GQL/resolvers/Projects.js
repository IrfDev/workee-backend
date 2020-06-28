const resolvers = {
    Query: {
        getAllProjects: async(_, __, ctx) => await ctx.projects.usecases.getAll(),

        getProjectById: async(_, { id }, ctx) =>
            await ctx.projects.usecases.getById(id),

        getProjectsByTags: async(_, { tags }, ctx) =>
            await ctx.projects.usecases.getByTag(tags),
    },
    Mutation: {
        updateProject: async(_, { input }, ctx) => {
            try {
                const updatedProject = await ctx.projects.usecases.updateProject(
                    input.id,
                    input,
                );
                return {
                    success: true,
                    message: `Notebook updated ${updatedProject}`,
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
        createProject: async(_, { input }, ctx) => {
            try {
                const newProject = await ctx.projects.usecases.create(input);
                return {
                    success: true,
                    message: `Project updated ${newProject}`,
                    data: newProject,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `can't update`,
                    data: error,
                };
            }
        },
        pushInProject: async(_, { id, target }, ctx) => {
            try {
                const projectUpdated = await ctx.projects.usecases.pushIds(id, target);
                return {
                    success: true,
                    message: `Project updated ${projectUpdated}`,
                    data: projectUpdated,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `can't update`,
                    data: error,
                };
            }
        },
        pullInProject: async(_, { id, target }, ctx) => {
            try {
                const projectUpdated = await ctx.projects.usecases.pullIds(id, target);
                return {
                    success: true,
                    message: `Project updated ${projectUpdated}`,
                    data: projectUpdated,
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