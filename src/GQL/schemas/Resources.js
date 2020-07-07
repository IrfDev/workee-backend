const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Resource {
    id: ID!
    name: String!
    tags: [String]
    website: String!
  }

  type Website {
    site: String
    urlLink: String
  }

  extend type Query {
    getAllResources: [Resource]
    getResourceById(id: ID!): Resource
    getResourcesByTags(tags: TagsInput): [Resource]
  }

  extend type Mutation {
    updateResource(input: UpdateResourceInput): ResourceModifiedCreatedInput
    createResource(input: CreateResourceInput): ResourceModifiedCreatedInput
    pushFromResource(id: ID!, tags: [String!]): ResourceModifiedCreatedInput
    pullFromResource(id: ID!, tags: [String!]): ResourceModifiedCreatedInput
  }

  input UpdateResourceInput {
    id: ID!
    tags: [String]
  }

  input CreateResourceInput {
    name: String!
    tags: [String]
    website: String!
  }

  input WebsiteInput {
    site: String
    urlLink: String
  }

  type ResourceModifiedCreatedInput {
    success: Boolean!
    message: String
    data: Resource
  }
`;

module.exports = typeDefs;