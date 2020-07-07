const jwt = require('../Lib/jwt');
const bcrypt = require('../Lib/bcrypt');
const User = require('../Models/User');

async function getLogin(email, password) {
    const userFounded = await User.findOne({ email });
    if (!userFounded) throw new Error('Invalid email or incorrect password');

    const validPassword = await bcrypt.compare(password, userFounded.password);
    if (!validPassword) throw new Error('Invalid email or incorrect password');

    return {
        usuario: userFounded.email,
        token: jwt.sign(),
    };
}

async function isAuthenticated(token) {
    const isTokenValid = await jwt.verify(token);

    if (!isTokenValid) {
        throw new Error('Unauthorized');
    } else {
        return true;
    }
}

module.exports = {
    getLogin,
    isAuthenticated,
};