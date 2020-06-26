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

  type Query {
    heroes: [Heroe]
    heroeById(id: ID!): Heroe
    heroesByTag(tags: TagsInput): Heroe
  }

  input TagsInput {
    tags: [String!]
  }

  type Mutation {
    updateHeroe(input: UpdateHeroeInput): HeroeModifiedCreatedInput
    createHero(input: createHeroeInput): HeroeModifiedCreatedInput
  }
  input UpdateHeroeInput {
    id: ID!
    tags: [String]
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