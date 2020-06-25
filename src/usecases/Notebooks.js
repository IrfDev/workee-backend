const notebookModel = require('../Models/Notebook');

function getAll() {
    return notebookModel.find();
}

function getById(id) {
    return notebookModel.findOne({ resourceId: id });
}

function create(newnotebook) {
    return notebookModel.create(newnotebook);
}

function updateNotebook(name, object) {
    return notebookModel.findAndUpdate({ resourceid: name }, object);
}

function pullFromNotebook(resourceId, object) {
    return notebookModel.findAndUpdate(resourceid, { $pull: object });
}

function pushFromNotebook(resourceId, object) {
    return notebookModel.findAndUpdate(resourceid, { $push: object });
}

module.exports = {
    getAll,
    create,
    getById,
    pushFromNotebook,
    updateNotebook,
    pullFromNotebook,
};