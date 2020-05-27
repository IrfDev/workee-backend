const taskModel = require('../Models/Tasks');

function getAll() {
    return taskModel.query().all();
}

function getById(id) {
    return taskModel.query({ resourceid: id });
}

function create(newtask) {
    return taskModel.create(newtask);
}

function updateTask(name, object) {
    return taskModel.update({ title: name }, object);
}

module.exports = {
    getAll,
    create,
    getById,
    updateTask,
};