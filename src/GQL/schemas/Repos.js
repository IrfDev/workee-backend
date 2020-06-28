const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Repo {
    githubId: String!
    githubRepo: ReposGithubPayload
    technologies: [String]
  }

  extend type Query {
    getAllRepos: [Repo]
    getRepoById(id: ID!): Repo
    getReposByTechnology(technologies: TechnologiesInput): [Repo]
    getAllGithubRepos: [ReposGithubPayload]
  }

  type ReposGithubPayload {
    id: ID!
    name: String
    owner: RepoOwner
    url: String
    language: String
    clone_url: String
  }

  type RepoOwner {
    login: String
    avatar_url: String
  }

  input TechnologiesInput {
    technologies: [String!]
  }

  extend type Mutation {
    updateRepo(input: UpdateRepoInput): RepoModifiedCreatedInput
    createRepo(input: createRepoInput): RepoModifiedCreatedInput
    pushFromRepo(id: ID!, technologies: [String!]): RepoModifiedCreatedInput
    pullFromRepo(id: ID!, technologies: [String!]): RepoModifiedCreatedInput
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