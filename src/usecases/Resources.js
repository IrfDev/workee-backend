const resourceModel = require('../Models/Resource');

function getAll() {
    return resourceModel.query().all();
}

function getById(id) {
    return resourceModel.query({ id });
}

function create(newresource) {
    return resourceModel.create(newresource);
}

function updateresource(name, object) {
    return resourceModel.update({ name }, object);
}

module.exports = {
    getAll,
    create,
    getById,
    updateresource,
};