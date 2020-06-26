const Project = require('../../usecases/Projects');

const resolvers = {
    Query: {
        getAllProjects: async() => await Project.getAll(),
        getProjectById: async(_, __, { id }, ___) => await Project.getById(id),
        getProjectsByTags: async(_, __, { tags }, ___) =>
            await Project.getByTag(tags),
    },
    Mutation: {
        updateProject: async(_, __, { input }, ___) =>
            await Project.updateProject(input.id, input),
        createProject: async(_, __, { input }, ___) => await Project.create(input),
        pushInProject: async(_, __, { id, object }, ___) =>
            await Project.pushIds(id, object),
        pullInProject: async(_, __, { id, object }, ___) =>
            await Project.pullIds(id, object),
    },
};

module.exports = resolvers;