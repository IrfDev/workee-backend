const { ApolloError, AuthenticationError } = require('apollo-server');

const resolvers = {
    Notebook: {
        onenoteNotebook: async(notebook, _, ctx) => {
            if (ctx.microsoftAuth.oauthToken.token.access_token) {
                const notebookOnenote = ctx.notebooks.usecases.getNotebooksByIdFromOnenote(
                    ctx.microsoftAuth.oauthToken.token.access_token,
                    notebook.onenoteId,
                );
                return notebookOnenote.value;
            } else {
                throw new AuthenticationError('Unauthorized from Microsoft');
            }
        },

        onenoteSections: async(notebook, _, ctx) => {
            if (ctx.microsoftAuth.oauthToken.token.access_token) {
                const notebookSections = notebook.sections;
                let notebookseFromOnenote = [];
                notebookSections.map(async(section) => {
                    const sectionOnenote = await ctx.notebooks.usecases.getNotebooksByIdFromOnenote(
                        ctx.microsoftAuth.oauthToken.token.access_token,
                        section,
                    );
                    notebookseFromOnenote.push(sectionOnenote);
                });
                return notebookseFromOnenote.value;
            } else {
                throw new AuthenticationError('Unauthorized from Microsoft');
            }
        },
    },
    Query: {
        getAllNotebooks: async(_, __, ctx) =>
            await ctx.notebooks.usecases.getAll(),

        getNotebookById: async(_, { id }, ctx) =>
            await ctx.notebooks.usecases.getById(id),

        getNotebooksByTags: async(_, { tags }, ctx) =>
            await ctx.notebooks.usecases.getByTag(tags),

        getNotebooksFromOnenote: async(_, __, ctx) => {
            if (ctx.microsoftAuth.oauthToken.token.access_token) {
                const notebooksArray = await ctx.notebooks.usecases.getNotebooksFromOnenote(
                    ctx.microsoftAuth.oauthToken.token.access_token,
                );

                return notebooksArray.value;
            } else {
                throw new AuthenticationError('Unauthorized from Microsoft');
            }
        },

        getSectionsFromOnenote: async(_, { notebookId }, ctx) => {
            if (ctx.microsoftAuth.oauthToken.token.access_token) {
                const sectionsArray = await ctx.notebooks.usecases.getSectionsFromOnenote(
                    ctx.microsoftAuth.oauthToken.token.access_token,
                    notebookId,
                );

                return sectionsArray.value;
            } else {
                throw new AuthenticationError('Unauthorized from Microsoft');
            }
        },
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