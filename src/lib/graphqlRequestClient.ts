import { GraphQLClient } from "graphql-request";

const graphqlReqeustClient = (token?: string) =>
  token
    ? new GraphQLClient("http://everyonekiosk.com:3200/graphql", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    : new GraphQLClient("http://everyonekiosk.com:3200/graphql");

export default graphqlReqeustClient;
