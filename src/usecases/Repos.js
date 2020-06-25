const repoModel = require('../Models/Repo');

function getAll() {
    return repoModel.find();
}

function getById(id) {
    return repoModel.find({ resourceId: id });
}

function create(newrepo) {
    return repoModel.create(newrepo);
}

function updateRepo(name, object) {
    return repoModel.findAndUpdate({ resourceid: name }, object);
}

function pullFromRepo(resourceId, object) {
    return repoModel.findAndUpdate(resourceId, {
        $pull: { technologies: object },
    });
}

function pushFromRepo(resourceId, object) {
    return repoModel.findAndUpdate(resourceId, {
        $push: { technologies: object },
    });
}

module.exports = {
    getAll,
    create,
    getById,
    updateRepo,
    pullFromRepo,
    pushFromRepo,
};