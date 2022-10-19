import { GraphQLClient } from "graphql-request";

const graphqlReqeustClient = (token?: string) =>
  token
    ? new GraphQLClient("http://146.56.137.17:3200/graphql", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    : new GraphQLClient("http://146.56.137.17:3200/graphql");

export default graphqlReqeustClient;
