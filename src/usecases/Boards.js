const boardModel = require('../Models/Board');

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
module.exports = {
    getAll,
    create,
    getById,
    updateBoard,
    pushTagsInBoard,
    pullTagsInBoard,
    getByTag,
};