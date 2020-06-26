const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Repo {
    githubId: String!
    technologies: [String]
  }

  type Query {
    getAllRepos: [Repo]
    repoById(id: ID!): Repo
    reposByTechnology(technologies: TechnologiesInput): [Repo]
  }

  input TechnologiesInput {
    technologies: [String!]
  }

  type Mutation {
    updateRepo(input: UpdateRepoInput): RepoModifiedCreatedInput
    createRepo(input: createRepoInput): RepoModifiedCreatedInput
  }
  input UpdateRepoInput {
    id: ID!
    technologies: [String]
  }

  input createRepoInput {
    githubId: String!
    technologies: [String]
  }

  type RepoModifiedCreatedInput {
    success: Boolean!
    message: String
    data: Repo
  }
`;
module.exports = typeDefs;