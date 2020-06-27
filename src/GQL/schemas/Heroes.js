const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Heroe {
    name: String
    tags: [String]
    links: [Link]
    id: ID!
  }

  type Link {
    website: String
    urlLink: String
  }

  extend type Query {
    getAllHeroes: [Heroe]
    getHeroeById(id: ID!): Heroe
    getHeroesByTags(tags: [String]): [Heroe]
    getHeroesByName(name: String!): [Heroe]
  }

  extend type Mutation {
    updateHeroe(input: UpdateHeroeInput): HeroeModifiedCreatedInput
    createHeroe(input: createHeroeInput): HeroeModifiedCreatedInput
    pushTagsInHeroe(id: ID!, tags: [String!]): HeroeModifiedCreatedInput
    pullTagsFromHeroe(id: ID!, tags: [String!]): HeroeModifiedCreatedInput
  }

  input UpdateHeroeInput {
    id: ID!
    tags: [String]
    links: [LinkInput]
  }

  input createHeroeInput {
    name: String!
    tags: [String]
    links: [LinkInput]
  }

  input LinkInput {
    website: String
    urlLink: String
  }

  type HeroeModifiedCreatedInput {
    success: Boolean
    message: String
    data: Heroe
  }
`;

module.exports = typeDefs;