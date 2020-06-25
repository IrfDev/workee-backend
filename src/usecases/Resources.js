const resourceModel = require('../Models/Resource');

function getAll() {
    return resourceModel.find();
}

function getById(id) {
    return resourceModel.find({ id });
}

function create(newresource) {
    return resourceModel.create(newresource);
}

function updateresource(name, object) {
    return resourceModel.findAndUpdate({ name }, object);
}

function pullFromResource(resourceId, tag) {
    return resourceModel.findAndUpdate(resourceId, { $pull: { tags: tag } });
}

function pushFromResource(resourceId, tag) {
    return resourceModel.findAndUpdate(resourceId, { $push: { tags: tag } });
}

module.exports = {
    getAll,
    create,
    getById,
    updateresource,
    pushFromResource,
    pullFromResource,
};