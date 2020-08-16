const notebookModel = require('../Models/Notebook');
var graph = require('../Lib/graph');

function getAll() {
    return notebookModel.find();
}

function getById(id) {
    return notebookModel.findById(id);
}

function create(newnotebook) {
    return notebookModel.create(newnotebook);
}

function updateNotebook(id, object) {
    return notebookModel.findByIDAndUpdate(id, object);
}

function pullFromNotebook(id, object) {
    return notebookModel.findByIdAndUpdate(id, { $pullAll: object });
}

function pushFromNotebook(id, object) {
    return notebookModel.findByIdAndUpdate(id, { $push: object });
}

function getNotebooksFromOnenote(token) {
    return graph.getNotebooks(token);
}

function getNotebooksByIdFromOnenote(token, id) {
    return graph.getNotebookById(token, id);
}

function getSectionFromOneNote(token, id) {
    return graph.getSectionById(token, id);
}

function getSectionsFromOnenote(token, notebookId) {
    return graph.getSections(token, notebookId);
}

function getSectionsFromNotebook(token, sectionId) {
    return graph.getSectionsFromNotebook(token, sectionId);
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
    getNotebooksByIdFromOnenote,
    getSectionFromOneNote,
};