const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Login {
    email: String!
    password: String
  }

  extend type Mutation {
    getLogin(input: LoginInput): JWT
  }

  type JWT {
    token: String!
    user: Login
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;