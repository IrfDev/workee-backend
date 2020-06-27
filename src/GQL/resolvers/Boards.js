const Board = require('../../usecases/Boards');

const resolvers = {
    Query: {
        getAllBoards: async() => await Board.getAll(),
        getBoardById: async(_, { id }, ___) => await Board.getById(id),
        getBoardsByTag: async(_, { tags }, ___) => await Board.getByTag(tags),
        getTrelloBoards: () => Board.getTrelloBoards(),
        getTrelloListsFromBoard: async(_, { boardId }, ___) =>
            await Board.getTrelloListsFromBoard(boardId),
        getTrelloCardsFromList: async(_, { listId }, ___) =>
            await Board.getTrelloCardsFromList(listId),
    },
    Mutation: {
        updateBoard: async(_, { input }, ___) => {
            try {
                const updatedBoard = await Board.updateBoard(input.id, input);
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
        createBoard: async(_, { input }, ___) => {
            try {
                const newBoard = await Board.create(input);
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
        pushTagsInBoard: async(_, { id, tags }, ___) => {
            try {
                const updatedBoard = await Board.pushTagsInBoard(id, tags);
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
        pullTagsFromBoard: async(_, { id, tags }, ___) => {
            try {
                const updatedBoard = await Board.pullTagsFromBoard(id, tags);
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