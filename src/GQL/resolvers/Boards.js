const { ApolloError } = require('apollo-server-express');

const resolvers = {
    Board: {
        trelloBoard: async(board, _, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            const trelloBoards = await ctx.board.usecases.getTrelloBoards();

            return trelloBoards.find(
                (trelloBoard) => trelloBoard.id === board.resourceid,
            );
        },

        trelloActiveList: async(board, _, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            const trelloLists = await ctx.board.usecases.getTrelloListsFromBoard(
                board.resourceid,
            );
            // console.log(trelloLists, board);

            return trelloLists.find(
                (trelloList) => trelloList.id === board.activeList,
            );
        },

        trelloCardsFromActiveList: async(board, _, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            const trelloCards = await ctx.board.usecases.getTrelloCardsFromList(
                board.activeList,
            );

            return trelloCards;
        },
    },
    Query: {
        getAllBoards: async(_, __, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            return await ctx.board.usecases.getAll();
        },

        getBoardById: async(_, { id }, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            return await ctx.board.usecases.getById(id);
        },

        getBoardsByTag: async(_, { tags }, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            return await ctx.board.usecases.getByTag(tags);
        },

        getTrelloBoards: (_, __, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            return ctx.board.usecases.getTrelloBoards();
        },

        getTrelloListsFromBoard: async(_, { boardId }, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            return await ctx.board.usecases.getTrelloListsFromBoard(boardId);
        },

        getTrelloCardsFromList: async(_, { listId }, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            return await ctx.board.usecases.getTrelloCardsFromList(listId);
        },
    },
    Mutation: {
        updateBoard: async(_, { input }, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            try {
                const updatedBoard = await ctx.board.usecases.updateBoard(
                    input.id,
                    input,
                );
                return {
                    success: true,
                    message: 'Board updated',
                    data: updatedBoard,
                };
            } catch (error) {
                return {
                    success: false,
                    message: "Couldn't create the board",
                    data: error,
                };
            }
        },
        createBoard: async(_, { input }, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            try {
                const newBoard = await ctx.board.usecases.create(input);
                return {
                    success: true,
                    message: 'New board created',
                    data: newBoard,
                };
            } catch (error) {
                return {
                    success: false,
                    message: "Couldn't create the board",
                    data: error,
                };
            }
        },
        pushTagsInBoard: async(_, { id, tags }, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            try {
                const updatedBoard = await ctx.board.usecases.pushTagsInBoard(id, tags);
                return {
                    success: true,
                    message: `Correctly push ${tags} into ${id}`,
                    data: updatedBoard,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `Couldn't push tags into ${id}`,
                    data: error,
                };
            }
        },
        pullTagsFromBoard: async(_, { id, tags }, ctx) => {
            if (!ctx.board) throw new ApolloError('Unauthorized!');
            try {
                const updatedBoard = await ctx.board.usecases.pullTagsFromBoard(
                    id,
                    tags,
                );
                return {
                    success: true,
                    message: `Correctly pull ${tags} from ${id}`,
                    data: updatedBoard,
                };
            } catch (error) {
                return {
                    success: false,
                    message: `Couldn't pull tags from ${id}`,
                    data: error,
                };
            }
        },
    },
};

module.exports = resolvers;