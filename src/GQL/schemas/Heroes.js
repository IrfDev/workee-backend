const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Heroe {
    name: String!
    tags: [String]
    links: [Link]
  }
  type Link {
    website: String
    urlLink: String
  }

  extend type Query {
    getAllHeroes: [Heroe]
    getHeroeById(id: ID!): Heroe
    getHeroesByTags(tags: [String]): [Heroe]
  }

  extend type Mutation {
    updateHeroe(input: UpdateHeroeInput): HeroeModifiedCreatedInput
    createHero(input: createHeroeInput): HeroeModifiedCreatedInput
    pushTagsInHero(id: ID!, tags: [String!]): HeroeModifiedCreatedInput
    pullTagsInHero(id: ID!, tags: [String!]): HeroeModifiedCreatedInput
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
    success: Boolean!
    message: String
    data: Heroe
  }
`;

module.exports = typeDefs;