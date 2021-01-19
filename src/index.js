import { GraphQLServer } from "graphql-yoga";

// Scalar types: String, Boolean, Int, Float, ID

const users = [
  {
    id: "fake-user-id-00",
    name: "Kevin Alvarez",
    email: "kevin@mail.com",
    age: 25
  },
  {
    id: "fake-user-id-01",
    name: "Cintia Montero",
    email: "cintia@mail.com",
    age: 27
  },
  {
    id: "fake-user-id-02",
    name: "Ricardo Suarez",
    email: "ricardo@mail.com",
    age: 31
  },
];

const typeDefs = `
  type Query {
    me: User!
    post: Post!
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        id: "fake-user-id-00",
        name: "Kevin Alvarez",
        email: "kevin@mail.com",
        age: 25
      };
    },
    post() {
      return {
        id: "fake-post-id",
        title: "GraphQL Bootcamp",
        body: "This post is essential for Tasking team",
        published: true
      };
    },
    users(parent, args, context, info) {
      return users;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.info("Server running on 4000 port"));
