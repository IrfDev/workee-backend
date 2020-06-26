const heroModel = require('../Models/Heroe');

function getAll() {
    return heroModel.find();
}

function getByName(name) {
    return heroModel.findOne({ name });
}

function getByTag(tags) {
    return heroModel.findOne({ tags });
}

function create(newhero) {
    return heroModel.create(newhero);
}

function updatehero(id, object) {
    return heroModel.findAndUpdate({ id }, object);
}

function pushTagsHero(name, object) {
    return heroModel.findAndUpdate({ name }, { $push: { tags: object } });
}

function pullTagsHero(name, object) {
    return heroModel.findAndUpdate({ name }, { $pull: { tags: object } });
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
    updatehero,
    pullTagsHero,
    pullLinkHero,
};