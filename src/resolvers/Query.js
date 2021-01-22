import getUserId from "../utils/getUserId";

const Query = {
  me: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request);
    return prisma.query.user({
      where: { id: userId }
    });
  },
  post: async (parent, { id }, { prisma, request }, info) => {
    const userId = getUserId(request, false);

    const posts = await prisma.query.posts({
      where: {
        id,
        OR: [{
          published: true
        }, {
          author: {
            id: userId
          }
        }]
      }
    }, info);

    if (posts.length === 0) {
      throw new Error("Post not found.");
    }
    return posts[0];
  },
  users(parent, args, { prisma }, info) {
    const { first, skip, after, orderBy } = args;
    return prisma.query.users({ first, skip, after, orderBy }, info);
  },
  posts(parent, { first, skip, after }, { prisma }, info) {
    return prisma.query.posts({
      first,
      skip,
      after,
      where: {
        published: true
      }
    }, info);
  },
  myPosts(parent, args, { prisma, request }, info) {
    const { first, skip, after, orderBy } = args;

    const userId = getUserId(request);
    return prisma.query.posts({
      first,
      skip,
      after,
      orderBy,
      where: {
        author: {
          id: userId
        }
      }
    }, info);
  },
  comments(parent, args, { prisma }, info) {
    const { first, skip, after, orderBy } = args;
    return prisma.query.comments({ first, skip, after, orderBy }, info);
  }
};

export default Query;
