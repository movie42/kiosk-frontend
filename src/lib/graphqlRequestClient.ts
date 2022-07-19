import { GraphQLClient } from "graphql-request";

const graphqlReqeustClient = (token?: string) =>
  token
    ? new GraphQLClient("https://everyonekiosk.com/graphql", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    : new GraphQLClient("https://everyonekiosk.com/graphql");

export default graphqlReqeustClient;
