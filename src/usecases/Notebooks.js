const notebookModel = require('../Models/Notebook');

function getAll() {
    return notebookModel.query().all();
}

function getById(id) {
    return notebookModel.query({ resourceId: id });
}

function create(newnotebook) {
    return notebookModel.create(newnotebook);
}

function updateNotebook(name, object) {
    return notebookModel.update({ resourceid: name }, object);
}

module.exports = {
    getAll,
    create,
    getById,
    updateNotebook,
};