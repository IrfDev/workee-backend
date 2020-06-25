const projectModel = require('../Models/Project');

async function getAll() {
    return projectModel.find();
}

function create(newProject) {
    return projectModel.create(newProject);
}

function updateProject(name, object) {
    const updatedObject = object;
    return projectModel.findOneAndUpdate({ title: name }, updatedObject);
}

function pushIds(name, object) {
    const updatedObject = object;
    return projectModel.findOneAndUpdate({ title: name }, { $push: updatedObject }, );
}

function pullIds(name, object) {
    const updatedObject = object;
    return projectModel.findOneAndUpdate({ title: name }, { $pull: updatedObject }, );
}

module.exports = {
    getAll,
    create,
    updateProject,
    pushIds,
    pullIds,
};