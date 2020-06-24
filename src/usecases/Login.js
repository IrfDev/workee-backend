const jwt = require('../lib/jwt');
const bcrypt = require('../lib/bcrypt');
const User = require('../Models/User');

async function getLogin(email, password) {
    const userFounded = await User.get({ email });
    console.log('User founded', userFounded.password);
    if (!userFounded) throw new Error('No se encontro un usuario con este email');

    const validPassword = await bcrypt.compare(password, userFounded.password);
    console.log(validPassword);
    if (!validPassword) throw new Error('Password incorrecto');

    return {
        usuario: userFounded,
        token: jwt.sign(),
    };
}

module.exports = {
    getLogin,
};