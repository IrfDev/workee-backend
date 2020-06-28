const repoModel = require('../Models/Repo');
const { default: Axios } = require('axios');

function getAll() {
    return repoModel.find();
}

function getById(id) {
    return repoModel.findById(id);
}

function getByTechnology(technologies) {
    return repoModel.find({ technologies });
}

function create(newrepo) {
    return repoModel.create(newrepo);
}

function updateRepo(id, object) {
    return repoModel.findByIdAndUpdate(id, object);
}

function pullFromRepo(id, object) {
    return repoModel.findByIdAndUpdate(id, {
        $pull: { technologies: object },
    });
}

function pushFromRepo(id, object) {
    return repoModel.findByIdAndUpdate(id, {
        $push: { technologies: object },
    });
}

async function getAllRepos() {
    try {
        const repos = await Axios.get('https://api.github.com/users/irfdev/repos');
        return repos.data;
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