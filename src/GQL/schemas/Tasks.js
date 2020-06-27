const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Task {
    resource: String!
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
    resource: String!
    tags: [String]
    type: String
  }

  type TaskModifiedCreatedInput {
    success: Boolean!
    message: String
    data: Task
  }
`;

module.exports = typeDefs;