// Llamamos brypt
const bcrypt = require('bcrypt');

// Llamamos nuestra variable de entorno
const { SALT_ROUND } = process.env;

// Creamos nuestra función hash y llamamos el salt
function hash(plainText) {
    return bcrypt.hash(plainText, parseInt(SALT_ROUND));
}

module.exports = {
    ...bcrypt,
    hash,
};