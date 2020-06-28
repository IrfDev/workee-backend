const resolvers = {
    Notebook: {
        onenoteNotebook: async(notebook, { token }, ctx) => {
            const notebookOnenote = ctx.notebooks.usecases.getNotebooksByIdFromOnenote(
                token,
                notebook.onenoteId,
            );
            return notebookOnenote;
        },

        onenoteSections: async(notebook, { token }, ctx) => {
            const notebookSections = notebook.sections;
            let notebookseFromOnenote = [];
            notebookSections.map(async(section) => {
                const sectionOnenote = await ctx.notebooks.usecases.getNotebooksByIdFromOnenote(
                    token,
                    section,
                );
                notebookseFromOnenote.push(sectionOnenote);
            });
            return notebookseFromOnenote;
        },
    },
    Query: {
        getAllNotebooks: async(_, __, ctx) =>
            await ctx.notebooks.usecases.getAll(),

        getNotebookById: async(_, { id }, ctx) =>
            await ctx.notebooks.usecases.getById(id),

        getNotebooksByTags: async(_, { tags }, ctx) =>
            await ctx.notebooks.usecases.getByTag(tags),

        getNotebooksFromOnenote: async(_, { token }, ctx) =>
            await ctx.notebooks.usecases.getNotebooksFromOnenote(token),

        getSectionsFromOnenote: async(_, { token, notebookId }, ctx) =>
            await ctx.notebooks.usecases.getSectionsFromOnenote(token, notebookId),
    },
    Mutation: {
        updateNotebook: async(_, { input }, ctx) => {
            const updatedNotebook = await ctx.notebooks.usecases.updateNotebook(
                input.id,
                input,
            );
            return {
                success: true,
                message: `Notebook updated ${input}`,
                data: updatedNotebook,
            };
        },
        createNotebook: async(_, { input }, ctx) => {
            const newNotebook = await ctx.notebooks.usecases.create(input);
            return {
                success: true,
                message: `Notebook created ${newNotebook}`,
                data: newNotebook,
            };
        },
        pullFromNotebook: async(_, { input, target }, ctx) => {
            console.log(target);
            const updatedNotebook = await ctx.notebooks.usecases.pullFromNotebook(
                input.id,
                target,
            );
            return {
                success: true,
                message: `Notebook object pull ${updatedNotebook}`,
                data: updatedNotebook,
            };
        },
        pushFromNotebook: async(_, { input, target }, ctx) => {
            const updatedNotebook = await ctx.notebooks.usecases.pushFromNotebook(
                input.id,
                target,
            );
            return {
                success: true,
                message: `Notebook object push ${updatedNotebook.id}`,
                data: updatedNotebook,
            };
        },
    },
};

module.exports = resolvers;