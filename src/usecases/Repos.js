const repoModel = require('../Models/Repo');
const { default: Axios } = require('axios');

function getAll() {
    return repoModel.find();
}

function getById(id) {
    return repoModel.find({ resourceId: id });
}

function getByTechnology(technology) {
    return repoModel.find({ technology });
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

function getAllRepos() {
    try {
        const repos = Axios.get('https://api.github.com/users/irfdev/repos');
        return repos.data.data;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getAll,
    create,
    getById,
    updateRepo,
    pullFromRepo,
    pushFromRepo,
    getByTechnology,
    getAllRepos,
};