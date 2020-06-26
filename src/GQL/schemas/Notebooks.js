const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Notebook {
    oneNoteId: String
    sections: [String]
    tags: [String]
    topics: [String]
  }

  extend type Query {
    getAllNotebooks: [Notebook]
    getNotebookById(id: ID!): Notebook
    getNotebooksByTags(tags: TagsInput): [Notebook]
    getNotebooksFromOnenote(token: String!): String
    getSectionsFromOnenote(token: String!, notebookId: String!): String
  }

  extend type Mutation {
    updateNotebook(input: UpdateNotebookInput): NotebookUpdateResponsePayload
    pullFromNotebook(input: UpdateNotebookInput): NotebookUpdateResponsePayload
    pushFromNotebook(input: UpdateNotebookInput): NotebookUpdateResponsePayload
    createNotebook(input: CreateNotebookInput): NotebookCreatedResponsePayload
  }

  input UpdateNotebookInput {
    id: ID!
    sections: [String]
    tags: [String]
    topics: [String]
  }
  input CreateNotebookInput {
    id: ID!
    sections: [String!]
    tags: [String!]
    topics: [String!]
  }

  type NotebookUpdateResponsePayload {
    success: Boolean!
    message: String
    data: Notebook
  }

  type NotebookCreatedResponsePayload {
    success: Boolean!
    message: String
    data: Notebook
  }
`;

module.exports = typeDefs;