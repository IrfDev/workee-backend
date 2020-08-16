const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Task {
    id: ID!
    resource: resourceTask!
    tags: [String]
    type: String
  }

  type Query {
    getAllTasks: [Task]
    getTaskById(id: ID!): Task
    getTasksByTag(tags: [String!]): [Task]
  }

  input TagsInput {
    tags: [String!]
  }

  type Mutation {
    updateTask(input: UpdateTaskInput): TaskModifiedCreatedInput
    createTask(input: createTaskInput): TaskModifiedCreatedInput
    pushFromTask(id: ID!, tags: [String!]): TaskModifiedCreatedInput
    pullFromTask(id: ID!, tags: [String!]): TaskModifiedCreatedInput
  }
  input UpdateTaskInput {
    id: ID!
    tags: [String]
  }

  input createTaskInput {
    resource: resourceInput
    tags: [String]
    type: String
  }

  input resourceInput {
    title: String!
    about: String!
  }

  type resourceTask {
    title: String!
    about: String!
  }

  type TaskModifiedCreatedInput {
    success: Boolean!
    message: String
    data: Task
  }
`;

module.exports = typeDefs;