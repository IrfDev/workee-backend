const projectModel = require('../Models/Project');

async function getAll() {
    return projectModel.scan().exec();
}

function create(newProject) {
    return projectModel.create(newProject);
}

function updateProject(name, object) {
    const updatedObject = object;
    return projectModel.update({ title: name }, { $ADD: updatedObject });
}

module.exports = {
    getAll,
    create,
    updateProject,
};