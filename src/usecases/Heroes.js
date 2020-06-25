const heroModel = require('../Models/Heroe');

function getAll() {
    return heroModel.find();
}

function getByName(name) {
    return heroModel.findOne({ name });
}

function create(newhero) {
    return heroModel.create(newhero);
}

function updatehero(name, object, method) {
    return heroModel.findAndUpdate({ name }, object);
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
    getByName,
    updatehero,
    pullTagsHero,
    pullLinkHero,
};