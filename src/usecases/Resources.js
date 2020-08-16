const resourceModel = require('../Models/Resource');

function getAll() {
    return resourceModel.find();
}

function getById(id) {
    return resourceModel.findById(id);
}

function getByTag(tag) {
    return resourceModel.find({ tags: tag });
}

function create(newresource) {
    return resourceModel.create(newresource);
}

function updateresource(name, object) {
    return resourceModel.findByIdAndUpdate({ name }, object);
}

function pullFromResource(resourceId, tag) {
    return resourceModel.findByIdAndUpdate(resourceId, { $pull: { tags: tag } });
}

function pushFromResource(resourceId, tag) {
    return resourceModel.findByIdAndUpdate(resourceId, {
        $push: { tags: tag },
    });
}

module.exports = {
    getAll,
    create,
    getById,
    updateresource,
    pushFromResource,
    pullFromResource,
    getByTag,
};