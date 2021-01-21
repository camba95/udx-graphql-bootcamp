import getUserId from "../utils/getUserId";

const User = {
  // Not needed anymore since prisma takes care of relations
  // posts(parent, args, { prisma }, info) {
  //   return db.posts.filter((post) => post.author === parent.id);
  // },
  // comments(parent, args, { db }, info) {
  //   return db.comments.filter((comment) => comment.author === parent.id);
  // },
  email: {
    fragment: "fragment userId on User { id }",
    resolve: async (parent, args, { prisma, request }, info) => {
      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      }, info);
    }
  },
  posts: {
    fragment: "fragment userId on User { id }",
    resolve: async (parent, args, { prisma, request }, info) => {
      const userId = getUserId(request, false);
      if (userId && userId === parent.id) {
        return parent.email;
      }
      return prisma.query.posts({
        where: {
          published: true
        }
      }, info);
    }
  }
};

export default User;
