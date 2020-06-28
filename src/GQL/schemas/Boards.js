const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Board {
    resourceid: String!
    trelloBoard: TrelloBoardsPayload!
    activeList: String!
    trelloActiveList: TrelloListPayload!
    trelloCardsFromActiveList: [TrelloCardsPayload!]
    tags: [String]
    id: ID
  }

  extend type Query {
    getAllBoards: [Board]
    getBoardById(id: ID!): Board
    getBoardsByTag(tags: [String]): [Board]
    getTrelloBoards: [TrelloBoardsPayload]
    getTrelloListsFromBoard(boardId: ID!): [TrelloListPayload]
    getTrelloCardsFromList(listId: ID!): [TrelloCardsPayload!]
  }

  type TrelloListPayload {
    id: ID!
    name: String!
    idBoard: String!
  }

  type TrelloCardsPayload {
    name: String!
    idBoard: String!
    desc: String!
    idList: String!
    shortUrl: String!
    dueReminder: String
    labels: LabelNames
  }

  type Cover {
    color: String!
    size: String
  }

  type TrelloBoardsPayload {
    name: String!
    desc: String!
    prefs: Prefs!
    shortUrl: String!
    id: ID!
    labelNames: LabelNames
  }

  type LabelNames {
    green: String
    yellow: String
    orange: String
    red: String
    purple: String
    blue: String
    sky: String
    lime: String
    pink: String
    black: String
  }

  type Prefs {
    backgroundImage: String
  }

  extend type Mutation {
    updateBoard(input: UpdateBoardInput): BoardDataResponsePayload
    createBoard(input: CreateBoardInput): BoardDataResponsePayload
    pushTagsInBoard(id: ID!, tags: [String!]): BoardDataResponsePayload
    pullTagsFromBoard(id: ID!, tags: [String!]): BoardDataResponsePayload
  }

  input UpdateBoardInput {
    id: ID!
    tags: [String]
  }

  input CreateBoardInput {
    resourceid: String!
    activeList: String
    tags: [String]
    id: ID
  }

  type BoardDataResponsePayload {
    success: Boolean!
    message: String
    data: Board
  }
`;
module.exports = typeDefs;