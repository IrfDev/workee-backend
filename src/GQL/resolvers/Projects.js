const Project = require('../../usecases/Projects');

const resolvers = {
    Query: {
        getAllProjects: async() => await Project.getAll(),
        getProjectById: async(_, { id }) => await Project.getById(id),
        getProjectsByTags: async(_, { tags }) => await Project.getByTag(tags),
    },
    Mutation: {
        updateProject: async(_, { input }) => {
            try {
                const updatedProject = await Project.updateProject(input.id, input);
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
        createProject: async(_, { input }) => {
            try {
                const newProject = await Project.create(input);
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
        pushInProject: async(_, { id, target }) => {
            try {
                const projectUpdated = await Project.pushIds(id, target);
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
        pullInProject: async(_, { id, target }) => {
            try {
                const projectUpdated = await Project.pullIds(id, target);
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