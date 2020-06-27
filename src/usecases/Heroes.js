const heroModel = require('../Models/Heroe');

function getAll() {
    return heroModel.find();
}

function getByName(name) {
    return heroModel.find({ name });
}

function getByTag(tags) {
    return heroModel.find({ tags });
}

function getById(id) {
    return heroModel.findById(id);
}

function create(newhero) {
    return heroModel.create(newhero);
}

function updateHero(id, object) {
    return heroModel.findByIdAndUpdate(id, object);
}

function pushTagsHero(id, tags) {
    return heroModel.findByIdAndUpdate(id, { $push: { tags } });
}

function pullTagsHero(id, object) {
    return heroModel.findByIdAndUpdate(id, { $pullAll: { tags: object } });
}

function pullLinkHero(name, object) {
    return heroModel.findAndUpdate({ name }, { $push: { links: object } });
}

module.exports = {
    getAll,
    create,
    pushTagsHero,
    getByTag,
    getByName,
    updateHero,
    getById,
    pullTagsHero,
    pullLinkHero,
};