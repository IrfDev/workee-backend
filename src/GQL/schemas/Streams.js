const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Stream {
    streamId: String!
    feedlyStreamsid: [String!]
    tags: [String!]
  }

  type Query {
    getAllStreams: [Stream]
    streamById(id: ID!): Stream
    streamsByTag(tags: TagsInput): [Stream]
  }

  input TagsInput {
    tags: [String!]
  }

  type Mutation {
    updateStream(input: UpdateStreamInput): StreamModifiedCreatedInput
    createStream(input: CreateStreamInput): StreamModifiedCreatedInput
  }

  input UpdateStreamInput {
    id: ID!
    tags: [String]
    feedlyStreamsid: [String!]
  }

  input CreateStreamInput {
    streamId: String!
    feedlyStreamsid: [String!]
    tags: [String!]
  }

  type StreamModifiedCreatedInput {
    success: Boolean!
    message: String
    data: Stream
  }
`;

module.exports = typeDefs;