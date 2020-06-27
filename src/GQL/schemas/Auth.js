const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Auth {
    hello: String
  }
  type Login {
    email: String!
    password: String
  }

  extend type Mutation {
    getLogin(input: LoginInput): JWT
  }

  type JWT {
    token: String!
    usuario: String
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;