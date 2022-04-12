import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: String!
    email: String!
    userName: String!
    firstName: String!
    lastName: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }
  type Mutation {
    createAccount(
      email: String!
      userName: String!
      firstName: String!
      lastName: String!
      password: String!
    ): User
  }
  type Query {
    seeProfile(userName: String!): User
  }
`;
