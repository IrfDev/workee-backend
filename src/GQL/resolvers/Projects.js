const { AuthenticationError } = require('apollo-server');

const resolvers = {
  Query: {
    getAllProjects: async (_, __, ctx) => {
      if (!ctx.projects) throw new AuthenticationError('Unauthorized!');
      return await ctx.projects.usecases.getAll();
    },

    getProjectById: async (_, { id }, ctx) => {
      if (!ctx.projects) throw new AuthenticationError('Unauthorized!');
      return await ctx.projects.usecases.getById(id);
    },

    getProjectsByTags: async (_, { tags }, ctx) => {
      if (!ctx.projects) throw new AuthenticationError('Unauthorized!');
      return await ctx.projects.usecases.getByTag(tags);
    },
  },

  Mutation: {
    deleteProject: async (_, { title, id }, ctx) => {
      console.log('[deletedProject]');
      if (!ctx.projects) throw new AuthenticationError('Unauthorized!');
      try {
        const deletedProject = await ctx.projects.usecases.deleteById(title);
        console.log('[Deleted Project]', deletedProject);
        return {
          success: true,
          message: `Project deleted ${deletedProject}`,
          data: { id },
        };
      } catch (error) {
        return {
          success: false,
          message: `Can't delete the project`,
          data: error,
        };
      }
    },

    updateProject: async (_, { input }, ctx) => {
      if (!ctx.projects)
        throw new AuthenticationError('Unauthorized! Login first');
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

    createProject: async (_, { input }, ctx) => {
      if (!ctx.projects) throw new AuthenticationError('Unauthorized!');
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

    pushInProject: async (_, { id, data, target }, ctx) => {
      if (!ctx.projects) throw new AuthenticationError('Unauthorized!');
      try {
        const projectUpdated = await ctx.projects.usecases.pushIds(
          id,
          data,
          target,
        );
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

    pullInProject: async (_, { id, target, resourceId }, ctx) => {
      if (!ctx.projects) throw new AuthenticationError('Unauthorized!');

      try {
        const projectUpdated = await ctx.projects.usecases.pullIds({
          id,
          resourceId,
          target,
        });
        console.log('[ProjectUpdatedResponse]', projectUpdated);
        return {
          success: true,
          message: `Project updated ${projectUpdated}`,
          data: { ...projectUpdated, resourceId, id: projectUpdated._id + '' },
        };
      } catch (error) {
        console.log(error);
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
