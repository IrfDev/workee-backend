module.exports = {
    Mutation: {
        async getLogin(_, { input }, ctx) {
            const Login = ctx.auth.usecases;

            const jwt = await Login.getLogin(input.email, input.password);

            return jwt;
        },
    },
};