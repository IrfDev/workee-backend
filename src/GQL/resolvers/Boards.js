const Board = require('../../usecases/Boards');

const resolvers = {
    Board: {
        trelloBoard: async(board, _, ctx) => {
            const trelloBoards = await ctx.board.usecases.getTrelloBoards();

            return trelloBoards.find(
                (trelloBoard) => trelloBoard.id === board.resourceid,
            );
        },

        trelloActiveList: async(board, _, ctx) => {
            const trelloLists = await ctx.board.usecases.getTrelloListsFromBoard(
                board.resourceId,
            );

            return trelloLists.find(
                (trelloList) => trelloList.id === board.activeList,
            );
        },

        trelloCardsFromActiveList: async(board, _, ctx) => {
            const trelloCards = await ctx.board.usecases.getTrelloCardsFromList(
                board.activeList,
            );

            return trelloCards;
        },
    },
    Query: {
        getAllBoards: async(_, __, ctx) => await ctx.board.usecases.getAll(),

        getBoardById: async(_, { id }, ctx) =>
            await ctx.board.usecases.getById(id),

        getBoardsByTag: async(_, { tags }, ctx) =>
            await ctx.board.usecases.getByTag(tags),

        getTrelloBoards: (_, __, ctx) => ctx.board.usecases.getTrelloBoards(),

        getTrelloListsFromBoard: async(_, { boardId }, ctx) =>
            await ctx.board.usecases.getTrelloListsFromBoard(boardId),

        getTrelloCardsFromList: async(_, { listId }, ctx) =>
            await ctx.board.usecases.getTrelloCardsFromList(listId),
    },
    Mutation: {
        updateBoard: async(_, { input }, ctx) => {
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