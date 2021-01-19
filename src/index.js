import { GraphQLServer } from "graphql-yoga";

// Scalar types: String, Boolean, Int, Float, ID

const typeDefs = `
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello() {
      return "Hello World"
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.info("Server running on 4000 port"));
