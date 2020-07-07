const boardModel = require('../Models/Board');
const trello = require('../Lib/trello');
const { TRELLO_MEMBER_ID } = process.env;

function getAll() {
    return boardModel.find();
}

function getById(id) {
    return boardModel.findById(id);
}

function getByTag(tag) {
    return boardModel.find({ tags: tag });
}

function create(newboard) {
    return boardModel.create(newboard);
}

function updateBoard(id, object) {
    return boardModel.findByIdAndUpdate(id, object);
}

function pushTagsInBoard(id, tags) {
    return boardModel.findByIdAndUpdate(id, { $push: { tags } });
}

function pullTagsFromBoard(id, tags) {
    return boardModel.findByIdAndUpdate(id, { $pullAll: { tags } });
}

async function getTrelloBoards() {
    try {
        const trelloBoards = await trello.getBoards(TRELLO_MEMBER_ID);
        // console.log(trelloBoards);
        return trelloBoards;
    } catch (error) {
        return error;
    }
}

async function getTrelloListsFromBoard(resourceId) {
    try {
        const trelloLists = await trello.getListsOnBoard(resourceId);
        return trelloLists;
    } catch (error) {
        return error;
    }
}

async function getTrelloCardsFromList(resourceId) {
    try {
        const trelloCardsFromList = await trello.getCardsOnList(resourceId);
        return trelloCardsFromList;
    } catch (error) {
        return error;
    }
}
module.exports = {
    getAll,
    create,
    getById,
    updateBoard,
    pushTagsInBoard,
    pullTagsFromBoard,
    getByTag,
    getTrelloBoards,
    getTrelloListsFromBoard,
    getTrelloCardsFromList,
};