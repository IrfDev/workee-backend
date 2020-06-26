const Task = require('../../usecases/Tasks');

const resolvers = {
    Query: {
        getAllTasks: async() => await Task.getAll(),
        getTaskById: async(_, __, { id }, ___) => await Task.getById(id),
        getTasksByTag: async(_, __, { tags }, ___) =>
            await Task.getByTechnology(tags),
    },
    Mutation: {
        updateTask: async(_, __, { input }, ___) =>
            await Task.updateTask(input.id, input),
        createTask: async(_, __, { input }, ___) => await Task.create(input),
        pushFromTask: async(_, __, { id, tags }, ___) =>
            await Task.pushTag(id, tags),
        pullFromTask: async(_, __, { id, tags }, ___) =>
            await Task.deleteTag(id, tags),
    },
};

module.exports = resolvers;