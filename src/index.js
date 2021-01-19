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

const posts = [
  {
    id: "fake-post-id-00",
    title: "GraphQL Bootcamp",
    body: "This post is essential for Tasking team",
    published: true,
    author: "fake-user-id-00",
  },
  {
    id: "fake-post-id-01",
    title: "MongoDB Bootcamp",
    body: "NoSQL database course",
    published: true,
    author: "fake-user-id-01",
  },
  {
    id: "fake-post-id-02",
    title: "React.js Bootcamp",
    body: "UI library for SPA",
    published: true,
    author: "fake-user-id-02",
  },
];

const comments = [
  {
    id: "fake-comment-id-00",
    text: "This works nicely",
    author: "fake-user-id-01",
    post: "fake-post-id-00",
  },
  {
    id: "fake-comment-id-01",
    text: "Glag you liked it",
    author: "fake-user-id-00",
    post: "fake-post-id-00",
  },
  {
    id: "fake-comment-id-02",
    text: "This sucks",
    author: "fake-user-id-02",
    post: "fake-post-id-01",
  },
  {
    id: "fake-comment-id-03",
    text: "Nevermind",
    author: "fake-user-id-00",
    post: "fake-post-id-01",
  },
];

const typeDefs = `
  type Query {
    me: User!
    post: Post!
    posts: [Post!]!
    users(query: String): [User!]!
    comments: [Comment!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
        id: "fake-post-id-00",
        title: "GraphQL Bootcamp",
        body: "This post is essential for Tasking team",
        published: true
      };
    },
    users(parent, args, context, info) {
      return users;
    },
    posts(parent, args, context, info) {
      return posts;
    },
    comments() {
      return comments;
    }
  },
  Post: {
    author(parent, args, context, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, context, info) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  Comment: {
    author(parent, args, context, info) {
      return users.find((user) => user.id === parent.author);
    },
    post(parent, args, context, info) {
      return posts.find((post) => post.id === parent.post);
    },
  },
  User: {
    posts(parent, args, context, info) {
      return posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, context, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.info("Server running on 4000 port"));
