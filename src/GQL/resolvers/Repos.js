const Repo = require('../../usecases/Repos');

const resolvers = {
    Query: {
        getAllRepos: async() => await Repo.getAll(),
        getRepoById: async(_, __, { id }, ___) => await Repo.getById(id),
        getReposByTechnology: async(_, __, { technologies }, ___) =>
            await Repo.getByTechnology(technologies),
        getAllGithubRepos: async() => await Repo.getAllGithubRepos(),
    },
    Mutation: {
        updateRepo: async(_, __, { input }, ___) =>
            await Repo.updateRepo(input.id, input),
        createRepo: async(_, __, { input }, ___) => await Repo.create(input),
        pushFromRepo: async(_, __, { id, technologies }, ___) =>
            await Repo.pullFromRepo(id, technologies),
        pullFromRepo: async(_, __, { id, technologies }, ___) =>
            await Repo.pushFromRepo(id, technologies),
    },
};

module.exports = resolvers;