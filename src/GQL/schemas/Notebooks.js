const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Notebook {
    onenoteId: String!
    onenoteNotebook: NotebookFromOneNotePayload
    onenoteSections: [NotebookFromOneNotePayload]
    sections: [String]
    tags: [String]
    id: ID!
    topics: [String]
  }

  extend type Query {
    getAllNotebooks: [Notebook]
    getNotebookById(id: ID!): Notebook
    getNotebooksByTags(tags: TagsInput): [Notebook]
    getNotebooksFromOnenote: [NotebookFromOneNotePayload]
    getSectionsFromOnenote(notebookId: String!): [NotebookFromOneNotePayload]
  }

  type NotebookFromOneNotePayload {
    id: ID!
    displayName: String
    sectionsUrl: String
    links: LinksOnenote
  }

  type LinksOnenote {
    oneNoteClientUrl: Href
  }

  type Href {
    href: String
  }

  extend type Mutation {
    updateNotebook(input: UpdateNotebookInput): NotebookUpdateResponsePayload
    pullFromNotebook(
      input: UpdateNotebookInput
      target: UpdateNotebookInput
    ): NotebookUpdateResponsePayload
    pushFromNotebook(
      input: UpdateNotebookInput
      target: UpdateNotebookInput
    ): NotebookUpdateResponsePayload
    createNotebook(input: CreateNotebookInput): NotebookCreatedResponsePayload
  }

  input UpdateNotebookInput {
    id: ID
    onenoteId: ID
    sections: [String]
    tags: [String]
    topics: [String]
  }

  input CreateNotebookInput {
    sections: [String!]
    onenoteId: ID!
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