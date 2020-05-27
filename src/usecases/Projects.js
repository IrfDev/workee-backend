const projectModel = require('../Models/Project');

function getAll() {
    return projectModel.query().all();
}

function create(newProject) {
    return projectModel.create(newProject);
}

function updateProject(name, object) {
    return projectModel.update({ title: name }, object);
}

module.exports = {
    getAll,
    create,
    updateProject,
};