const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Stream {
    feedlyStreamsid: [String!]
    feedlyStreams: FeedFromFeedlyPayload
    feedlyItems: [FeedItem]
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
    id: String!
    title: String!
    keywords: [String!]
    summary: FeedItemSummary!
    content: FeedItemContent!
    label: String!
    author: String!
    canonicalUrl: String!
    origin: FeedItemOrigin!
    visual: FeedItemVisual!
    categories: [FeedItemCategory!]
  }

  type FeedItemSummary {
    content: String!
  }

  type FeedItemCategory {
    id: String!
    label: String!
  }

  type FeedItemOrigin {
    title: String!
    htmlUrl: String!
  }

  type FeedItemVisual {
    url: String!
    width: Int!
    Height: Int!
  }

  type FeedItemContent {
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