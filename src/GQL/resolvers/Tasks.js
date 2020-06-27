const Task = require('../../usecases/Tasks');

const resolvers = {
    Query: {
        getAllTasks: async() => await Task.getAll(),
        getTaskById: async(_, { id }, ___) => await Task.getById(id),
        getTasksByTag: async(_, { tags }, ___) => await Task.getByTag(tags),
    },
    Mutation: {
        updateTask: async(_, { input }, ___) => {
            try {
                const updatedTask = await Task.updateTask(input.id, input);
                return {
                    success: true,
                    message: `Task updated ${updatedTask}`,
                    data: updatedTask,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `can't update task`,
                    data: error,
                };
            }
        },
        createTask: async(_, { input }, ___) => {
            try {
                const createdTask = await Task.create(input);
                return {
                    success: true,
                    message: `Task created ${createdTask}`,
                    data: createdTask,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `can't create task`,
                    data: error,
                };
            }
        },
        pushFromTask: async(_, { id, tags }, ___) => {
            try {
                const updatedTask = await Task.pushTag(id, tags);
                return {
                    success: true,
                    message: `Task updated ${updatedTask}`,
                    data: updatedTask,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `can't create task`,
                    data: error,
                };
            }
        },
        pullFromTask: async(_, { id, tags }, ___) => {
            try {
                const updatedTask = await Task.deleteTag(id, tags);
                return {
                    success: true,
                    message: `Task updated ${updatedTask}`,
                    data: updatedTask,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `can't create task`,
                    data: error,
                };
            }
        },
    },
};

module.exports = resolvers;