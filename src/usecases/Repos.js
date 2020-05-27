const repoModel = require('../Models/Repo');

function getAll() {
    return repoModel.query();
}

function getById(id) {
    repoModel.query({ resourceId: id });
}

function create(newrepo) {
    return repoModel.create(newrepo);
}

function updateRepo(name, object) {
    repoModel.update({ resourceid: name }, object);
}

module.exports = {
    getAll,
    create,
    getById,
    updateRepo,
};