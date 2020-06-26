const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Resource {
    name: String!
    tags: [String]
    website: Website
  }

  type Website {
    site: String
    urlLink: String
  }

  type Query {
    getAllResources: [Resource]
    resourceById(id: ID!): Resource
    resourcesByTag(tags: TagsInput): [Resource]
  }

  input TagsInput {
    tags: [String!]
  }

  type Mutation {
    updateResource(input: UpdateResourceInput): ResourceModifiedCreatedInput
    createResource(input: CreateResourceInput): ResourceModifiedCreatedInput
  }

  input UpdateResourceInput {
    id: ID!
    tags: [String]
  }

  input CreateResourceInput {
    title: String!
    name: String!
    tags: [String]
    website: WebsiteInput
  }

  type WebsiteInput {
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