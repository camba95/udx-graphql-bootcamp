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
  users(parent, args, { prisma }, info) {
    return prisma.query.users(null, info);
  },
  posts(parent, args, { prisma }, info) {
    return prisma.query.posts(null, info);
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  }
};

export default Query;
