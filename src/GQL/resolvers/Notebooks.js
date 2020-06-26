const Notebook = require('../../usecases/Notebooks');

const resolvers = {
    Query: {
        getAllNotebooks: async() => await Notebook.getAll(),
        getNotebookById: async(_, __, { id }, ___) => await Notebook.getById(id),
        getNotebooksByTags: async(_, __, { tags }, ___) =>
            await Notebook.getByTag(tags),
        getNotebooksFromOnenote: async(_, __, { token }) =>
            await Notebook.getNotebooksFromOnenote(token),
        getSectionsFromOnenote: async(_, __, { token, notebookId }) =>
            await Notebook.getSectionsFromOnenote(token, notebookId),
    },
    Mutation: {
        updateNotebook: async(_, __, { input }, ___) =>
            await Notebook.updateNotebook(input.id, input),
        createNotebook: async(_, __, { input }, ___) =>
            await Notebook.create(input),
        pullFromNotebook: async(_, __, { id, object }, ___) =>
            await Notebook.pullFromNotebook(id, object),
        pushFromNotebook: async(_, __, { id, object }, ___) =>
            await Notebook.pushFromNotebook(id, object),
    },
};

module.exports = resolvers;