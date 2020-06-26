const notebookModel = require('../Models/Notebook');
var graph = require('../Lib/graph');

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
    return notebookModel.findAndUpdate(resourceId, { $pull: object });
}

function pushFromNotebook(resourceId, object) {
    return notebookModel.findAndUpdate(resourceId, { $push: object });
}

function getNotebooksFromOnenote(token) {
    return graph.getNotebooks(token);
}

function getSectionsFromOnenote(token, notebookId) {
    return graph.getSections(token, notebookId);
}

module.exports = {
    getAll,
    create,
    getById,
    pushFromNotebook,
    updateNotebook,
    pullFromNotebook,
    getSectionsFromOnenote,
    getNotebooksFromOnenote,
};