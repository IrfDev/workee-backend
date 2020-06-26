const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Project {
    title: String!
    description: String!
    thumb: String!
    weekly: Weekly
    daily: Daily
    sources: Sources
    resources: Resources
  }

  type Weekly {
    Boards: [String]
  }

  type Daily {
    tasks: [String]
  }

  type Sources {
    streams: [String]
    heroes: [String]
  }

  type Resources {
    repos: [String]
    notebooks: [String]
    resources: [String]
  }

  extend type Query {
    getAllProjects: [Project]
    getProjectById(id: ID!): Project
    getProjectsByTags(tags: TagsInput): [Project]
  }

  extend type Mutation {
    updateProject(input: UpdateProjectInput): ProjectModifiedCreatedInput
    createProject(input: CreateProjectInput): ProjectModifiedCreatedInput
    pushInProject(input: UpdateProjectInput): ProjectModifiedCreatedInput
    pullInProject(input: UpdateProjectInput): ProjectModifiedCreatedInput
  }

  input CreateProjectInput {
    title: String!
    description: String!
    thumb: String!
    weekly: WeeklyInput
    daily: DailyInput
    sources: SourcesInput
    resources: ResourcesInput
  }
  input UpdateProjectInput {
    id: ID
    title: String
    description: String
    thumb: String
    weekly: WeeklyInput
    daily: DailyInput
    sources: SourcesInput
    resources: ResourcesInput
  }

  input WeeklyInput {
    Boards: [String]
  }

  input DailyInput {
    tasks: [String]
  }

  input SourcesInput {
    streams: [String]
    heroes: [String]
  }

  input ResourcesInput {
    repos: [String]
    notebooks: [String]
    resources: [String]
  }

  type ProjectModifiedCreatedInput {
    success: Boolean!
    message: String
    data: Project
  }
`;

module.exports = typeDefs;