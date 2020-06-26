const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Board {
    resourceid: String!
    activeList: String!
    tags: [String]
    id: ID
  }

  type Query {
    boards: [Board]
    board(id: ID!): Board
    boardsByTag(tags: TagsInput): [Board]
  }

  type Mutation {
    updateBoard(input: UpdateBoardInput): BoardUpdatedResponsePayloads
    createBoard(input: CreateBoardInput): BoardCreateResponsePayload
  }
  input TagsInput {
    tags: [String!]
  }
  input UpdateBoardInput {
    id: ID!
    tags: [String]
  }

  input CreateBoardInput {
    resourceid: String!
    activeList: String!
    tags: [String]
    id: ID
  }

  type BoardCreateResponsePayload {
    success: Boolean!
    message: String
    data: Board
  }

  type BoardUpdatedResponsePayloads {
    success: Boolean!
    message: String
    data: [Board]
  }
`;
module.exports = typeDefs;