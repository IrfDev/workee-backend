const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        getAllTasks: async(_, __, ctx) => {
            if (ctx.tasks) throw new AuthenticationError('Unauthorized!');
            return await ctx.tasks.usecases.getAll();
        },

        getTaskById: async(_, { id }, ctx) => {
            if (ctx.tasks) throw new AuthenticationError('Unauthorized!');
            return await ctx.tasks.usecases.getById(id);
        },

        getTasksByTag: async(_, { tags }, ctx) => {
            if (ctx.tasks) throw new AuthenticationError('Unauthorized!');
            return await ctx.tasks.usecases.getByTag(tags);
        },
    },
    Mutation: {
        updateTask: async(_, { input }, ctx) => {
            if (ctx.tasks) throw new AuthenticationError('Unauthorized!');

            try {
                const updatedTask = await ctx.tasks.usecases.updateTask(
                    input.id,
                    input,
                );
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

        createTask: async(_, { input }, ctx) => {
            if (ctx.tasks) throw new AuthenticationError('Unauthorized!');

            try {
                const createdTask = await ctx.tasks.usecases.create(input);
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

        pushFromTask: async(_, { id, tags }, ctx) => {
            if (ctx.tasks) throw new AuthenticationError('Unauthorized!');

            try {
                const updatedTask = await ctx.tasks.usecases.pushTag(id, tags);
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

        pullFromTask: async(_, { id, tags }, ctx) => {
            if (ctx.tasks) throw new AuthenticationError('Unauthorized!');

            try {
                const updatedTask = await ctx.tasks.usecases.deleteTag(id, tags);
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