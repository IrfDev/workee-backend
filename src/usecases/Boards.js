const boardModel = require('../Models/Board');
const trello = require('../Lib/trello');

function getAll() {
    return boardModel.find();
}

function getById(id) {
    return boardModel.findOne({ resourceid: id });
}

function getByTag(tag) {
    return boardModel.find({ tags: tag });
}

function create(newboard) {
    return boardModel.create(newboard);
}

function updateBoard(resourceid, object) {
    return boardModel.findAndUpdate(resourceid, object);
}

function pushTagsInBoard(resourceid, tags) {
    return boardModel.findAndUpdate(resourceid, { $push: tags });
}

function pullTagsInBoard(resourceid, tags) {
    return boardModel.findOneAndUpdate(resourceid, { $pullAll: { tags } });
}

async function getTrelloBoards() {
    try {
        const trelloBoards = await trello.getBoards(TRELLO_MEMBER_ID);
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
    pullTagsInBoard,
    getByTag,
    getTrelloBoards,
    getTrelloListsFromBoard,
    getTrelloCardsFromList,
};