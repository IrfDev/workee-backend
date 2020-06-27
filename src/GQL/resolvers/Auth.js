const Login = require('../../usecases/Login');

module.exports = {
    Mutation: {
        async getLogin(_, { input }) {
            const jwt = await Login.getLogin(input.email, input.password);
            return jwt;
        },
    },
};