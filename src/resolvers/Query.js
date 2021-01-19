const Query = {
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
  users(parent, args, { db }, info) {
    return db.users;
  },
  posts(parent, args, { db }, info) {
    return db.posts;
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  }
};

export default Query;
