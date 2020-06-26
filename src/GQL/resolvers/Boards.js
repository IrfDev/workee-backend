const Board = require('../../usecases/Boards');

const resolvers = {
    Query: {
        getAllBoards: async() => await Board.getAll(),
        getBoardsById: async(_, __, { id }, ___) => await Board.getById(id),
        getBoardsByTag: async(_, __, { tags }, ___) => await Board.getByTag(tags),
    },
    Mutation: {
        updateBoard: async(_, __, { input }, ___) =>
            await Board.updateBoard(input.id, input),
        createBoard: async(_, __, { input }, ___) => await Board.create(input),
        pushTagsInBoard: async(_, __, { id, tags }, ___) =>
            await Board.pushTagsInBoard(id, tags),
        pullTagsInBoard: async(_, __, { id, tags }, ___) =>
            await Board.pushTagsInBoard(id, tags),
    },
};

module.exports = resolvers;