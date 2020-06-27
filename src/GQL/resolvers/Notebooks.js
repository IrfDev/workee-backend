const Notebook = require('../../usecases/Notebooks');

const resolvers = {
    Query: {
        getAllNotebooks: async() => await Notebook.getAll(),
        getNotebookById: async(_, { id }) => await Notebook.getById(id),
        getNotebooksByTags: async(_, { tags }) => await Notebook.getByTag(tags),
        getNotebooksFromOnenote: async(_, { token }) =>
            await Notebook.getNotebooksFromOnenote(token),
        getSectionsFromOnenote: async(_, { token, notebookId }) =>
            await Notebook.getSectionsFromOnenote(token, notebookId),
    },
    Mutation: {
        updateNotebook: async(_, { input }) => {
            const updatedNotebook = await Notebook.updateNotebook(input.id, input);
            return {
                success: true,
                message: `Notebook updated ${input}`,
                data: updatedNotebook,
            };
        },
        createNotebook: async(_, { input }) => {
            const newNotebook = await Notebook.create(input);
            return {
                success: true,
                message: `Notebook created ${newNotebook}`,
                data: newNotebook,
            };
        },
        pullFromNotebook: async(_, { input, target }) => {
            console.log(target);
            const updatedNotebook = await Notebook.pullFromNotebook(input.id, target);
            return {
                success: true,
                message: `Notebook object pull ${updatedNotebook}`,
                data: updatedNotebook,
            };
        },
        pushFromNotebook: async(_, { input, target }) => {
            const updatedNotebook = await Notebook.pushFromNotebook(input.id, target);
            return {
                success: true,
                message: `Notebook object push ${updatedNotebook.id}`,
                data: updatedNotebook,
            };
        },
    },
};

module.exports = resolvers;