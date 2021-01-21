import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import { resolvers, fragmentReplacements } from "./resolvers";
import prisma from "./prisma";

const pubSub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      db,
      request,
      pubSub,
      prisma
    }
  },
  fragmentReplacements
});
server.start(() => console.info("Server running on 4000 port"));
