const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Stream {
    streamId: String!
    feedlyStreamsid: [String!]
    tags: [String!]
  }

  extend type Query {
    getAllStreams: [Stream]
    getStreamById(id: ID!): Stream
    getStreamsByTag(tags: TagsInput): [Stream]
    getFeedsFromFeedly: StreamModifiedCreatedInput
    getStreamsFromFeedly(id: ID!): StreamModifiedCreatedInput
  }

  extend type Mutation {
    updateStream(input: UpdateStreamInput): StreamModifiedCreatedInput
    createStream(input: CreateStreamInput): StreamModifiedCreatedInput
    pushFromStream(id: ID!, tags: [String!]): StreamModifiedCreatedInput
    pullFromStream(id: ID!, tags: [String!]): StreamModifiedCreatedInput
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