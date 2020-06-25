const taskModel = require('../Models/Tasks');

function getAll() {
    return taskModel.find();
}

function getById(id) {
    return taskModel.findById(id);
}

function create(newtask) {
    return taskModel.create(newtask);
}

function updateTaskfromTodo(reseourceId, object) {
    return taskModel.findAndUpdate(reseourceId, object);
}

function deleteTag(id, tag) {
    return taskModel.findByIdAndUpdate(id, { $push: { tags: tag } });
}

function pushTag(id, tag) {
    return taskModel.findByIdAndUpdate(id, { $pull: { tags: tag } });
}

function updateTask(id, object) {
    return taskModel.findByIdAndUpdate(id, object);
}

module.exports = {
    getAll,
    create,
    getById,
    updateTask,

    deleteTag,
    updateTaskfromTodo,
    pushTag,
};