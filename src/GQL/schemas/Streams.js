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
    getStreamsByTag(tags: [String]): [Stream]
    getFeedsFromFeedly: [FeedFromFeedlyPayload]
    getStreamsFromFeedly(id: ID!): [FeedFromStreamPayload]
  }

  type FeedFromFeedlyPayload {
    id: ID!
    title: String
    label: String
    items: [FeedItem]
    feeds: [FeedItem]
  }

  type FeedItem {
    id: String
    title: String
    keywords: [String]
    content: ContentFeedItem
    label: String
    author: String
    canonicalUrl: String
    visual: VisuaFeedItem
  }

  type VisuaFeedItem {
    url: String!
    width: Int!
    Height: Int!
  }

  type ContentFeedItem {
    content: String
  }

  type FeedFromStreamPayload {
    id: ID!
    title: String
    topics: [String]
    visualUrl: String
    iconUrl: String
    description: String
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