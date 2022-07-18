import { GraphQLClient } from "graphql-request";

const graphqlReqeustClient = (token?: string) =>
  token
    ? new GraphQLClient("http://www.everyonekiosk.com:3100/graphql", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    : new GraphQLClient("http://www.everyonekiosk.com:3100/graphql");

export default graphqlReqeustClient;
