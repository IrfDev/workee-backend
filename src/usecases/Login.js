const jwt = require('../lib/jwt');
const bcrypt = require('../lib/bcrypt');
const User = require('../Models/User');

async function getLogin(email, password) {
    console.log('GetLogin Resolver', { email, password });
    const userFounded = await User.findOne({ email });
    if (!userFounded) throw new Error('No se encontro un usuario con este email');

    const validPassword = await bcrypt.compare(password, userFounded.password);
    if (!validPassword) throw new Error('Password incorrecto');

    return {
        usuario: userFounded.email,
        token: jwt.sign(),
    };
}

module.exports = {
    getLogin,
};