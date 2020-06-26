const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Board {
    resourceid: String!
    activeList: String!
    tags: [String]
    id: ID
  }

  extend type Query {
    getAllboards: [Board]
    getBoardById(id: ID!): Board
    getBoardsByTag(tags: TagsInput): [Board]
    getTrelloBoards: Board
    getTrelloListsFromBoard(boardId: ID!): Board
    getTrelloCardsFromList(listId: ID!): Board
  }

  extend type Mutation {
    updateBoard(input: UpdateBoardInput): BoardUpdatedResponsePayloads
    createBoard(input: CreateBoardInput): BoardCreateResponsePayload
    pushTagsInBoard(id: ID!, tags: [String!]): BoardCreateResponsePayload
    pullTagsInBoard(id: ID!, tags: [String!]): BoardCreateResponsePayload
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