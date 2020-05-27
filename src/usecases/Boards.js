const boardModel = require('../Models/Board');

console.log(boardModel);

function getAll() {
    return boardModel.query().all();
}

function getById(id) {
    return boardModel.query({ resourceid: id });
}

function create(newboard) {
    return boardModel.create(newboard);
}

function updateBoard(name, object) {
    return boardModel.update({ resourceid: name }, object);
}

module.exports = {
    getAll,
    create,
    getById,
    updateBoard,
};