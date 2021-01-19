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

const db = {
  users,
  posts,
  comments
};

export default db;
