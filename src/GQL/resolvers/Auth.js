const Login = require('../../usecases/Login');

const resolvers = {
    Mutation: {
        getLogin: async(_, __, { email, password }) =>
            Login.getLogin(email, password),
    },
};

module.exports = resolvers;