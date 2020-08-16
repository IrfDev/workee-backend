const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Project {
    title: String!
    description: String!
    thumb: String
    weekly: Weekly
    daily: Daily
    sources: Sources
    resources: Resources
    id: ID!
  }

  type Weekly {
    boards: [Board]
  }

  type Daily {
    tasks: [Task]
  }

  type Sources {
    streams: [Stream]
    heroes: [Heroe]
  }

  type Resources {
    repos: [Repo]
    notebooks: [Notebook]
    resources: [Resource]
  }

  extend type Query {
    getAllProjects: [Project]
    getProjectById(id: ID!): Project
    getProjectsByTags(tags: TagsInput): [Project]
  }

  extend type Mutation {
    updateProject(input: UpdateProjectInput): ProjectModifiedCreatedInput
    createProject(input: CreateProjectInput): ProjectModifiedCreatedInput
    pushInProject(
      id: ID!
      data: String!
      target: String!
    ): ProjectModifiedCreatedInput

    pullInProject(
      id: ID!
      target: UpdateProjectInput
    ): ProjectModifiedCreatedInput
  }

  input CreateProjectInput {
    title: String!
    description: String!
    thumb: String
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
    boards: [String]
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