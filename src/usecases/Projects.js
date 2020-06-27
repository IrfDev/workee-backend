const projectModel = require('../Models/Project');

async function getAll() {
    return projectModel.find();
}
async function getById(id) {
    return projectModel.findById(id);
}
async function getByTag(tags) {
    return projectModel.find(tags);
}

function create(newProject) {
    return projectModel.create(newProject);
}

function updateProject(id, object) {
    const updatedObject = object;
    return projectModel.findByIdAndUpdate(id, updatedObject);
}

function pushIds(id, object) {
    const updatedObject = object;
    return projectModel.findByIdAndUpdate(id, { $push: updatedObject });
}

function pullIds(id, object) {
    const updatedObject = object;
    return projectModel.findByIdAndUpdate(id, { $pull: updatedObject });
}

module.exports = {
    getAll,
    create,
    updateProject,
    pushIds,
    pullIds,
    getById,
    getByTag,
};