const heroModel = require('../Models/Heroe');

function getAll() {
    return heroModel.query().all();
}

function getByName(name) {
    return heroModel.query({ name });
}

function create(newhero) {
    return heroModel.create(newhero);
}

function updatehero(name, object) {
    return heroModel.update({ name }, object);
}

module.exports = {
    getAll,
    create,
    getByName,
    updatehero,
};