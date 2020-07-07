const { AuthenticationError } = require('apollo-server');

const resolvers = {
    Notebook: {
        onenoteNotebook: async(notebook, _, ctx) => {
            // Check if already have Microsoft Graph Token {This token come from passport session}
            if (!ctx.microsoftAuth.oauthToken)
                throw new AuthenticationError('Unauthorized from Microsoft');

            const notebookOnenote = ctx.notebooks.usecases.getNotebooksByIdFromOnenote(
                ctx.microsoftAuth.oauthToken.token.access_token,
                notebook.onenoteId,
            );

            return notebookOnenote.value;
        },

        onenoteSections: async(notebook, _, ctx) => {
            if (!ctx.microsoftAuth.oauthToken)
                throw new AuthenticationError('Unauthorized from Microsoft');

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
        },
    },

    Query: {
        getAllNotebooks: async(_, __, ctx) => {
            // This context object was build in the server when you Authenticate
            if (!ctx.notebooks) throw new AuthenticationError('Unauthorized!');
            return await ctx.notebooks.usecases.getAll();
        },

        getNotebookById: async(_, { id }, ctx) => {
            if (!ctx.notebooks) throw new AuthenticationError('Unauthorized!');
            return await ctx.notebooks.usecases.getById(id);
        },

        getNotebooksByTags: async(_, { tags }, ctx) => {
            if (!ctx.notebooks) throw new AuthenticationError('Unauthorized!');
            return await ctx.notebooks.usecases.getByTag(tags);
        },

        getNotebooksFromOnenote: async(_, __, ctx) => {
            if (!ctx.microsoftAuth.oauthToken.token.access_token)
                throw new AuthenticationError('Unauthorized from Microsoft');

            const notebooksArray = await ctx.notebooks.usecases.getNotebooksFromOnenote(
                ctx.microsoftAuth.oauthToken.token.access_token,
            );

            return notebooksArray.value;
        },

        getSectionsFromOnenote: async(_, { notebookId }, ctx) => {
            if (!ctx.microsoftAuth.oauthToken.token.access_token)
                throw new AuthenticationError('Unauthorized from Microsoft');

            const sectionsArray = await ctx.notebooks.usecases.getSectionsFromOnenote(
                ctx.microsoftAuth.oauthToken.token.access_token,
                notebookId,
            );

            return sectionsArray.value;
        },
    },
    Mutation: {
        updateNotebook: async(_, { input }, ctx) => {
            if (!ctx.notebooks) throw new AuthenticationError('Unauthorized!');

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
            if (!ctx.notebooks) throw new AuthenticationError('Unauthorized!');

            const newNotebook = await ctx.notebooks.usecases.create(input);
            return {
                success: true,
                message: `Notebook created ${newNotebook}`,
                data: newNotebook,
            };
        },

        pullFromNotebook: async(_, { input, target }, ctx) => {
            if (!ctx.notebooks) throw new AuthenticationError('Unauthorized!');

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
            if (!ctx.notebooks) throw new AuthenticationError('Unauthorized!');

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