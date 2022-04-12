import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import schema from "./schema";
import { GraphQLSchema } from "graphql";
import client from "./client";

const startApolloServer = async (schema: GraphQLSchema) => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      return {
        client,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });

  app.listen(5500);

  console.log("http://localhost:5500");
};

startApolloServer(schema);
