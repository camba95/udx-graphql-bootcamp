
const Mutation = {
  createUser: async (parent, { data }, { prisma }, info) => {
    const emailTaken = await prisma.exists.User({ email: data.email });
    if (emailTaken) {
      throw new Error("Email taken.");
    }
    return prisma.mutation.createUser({ data }, info);
  },
  deleteUser: async (parent, { id }, { prisma }, info) => {
    const userExists = await prisma.exists.User({ id });
    if (!userExists) {
      throw new Error("User not found.");
    }
    return prisma.mutation.deleteUser({
      where: { id }
    }, info);
  },
  updateUser: async (parent, { id, data }, { prisma }, info) => {
    return prisma.mutation.updateUser({
      where: { id },
      data
    }, info);
  },
  createPost: async (parent, { data }, { prisma }, info) => {
    const userExists = await prisma.exists.User({ id: data.author });
    if (!userExists) {
      throw new Error("User not found.");
    }
    return prisma.mutation.createPost({
      data: {
        title: data.title,
        body: data.body,
        published: data.published,
        author: {
          connect: {
            id: data.author
          }
        }
      }
    }, info);
  },
  deletePost(parent, { id }, { prisma }, info) {
    return prisma.mutation.deletePost({
      where: { id }
    }, info);
  },
  updatePost(parent, { id, data }, { prisma }, info) {
    return prisma.mutation.updatePost({
      where: { id },
      data
    }, info);
  },
  createComment(parent, { data }, { prisma }, info) {
    return prisma.mutation.createComment({
      data: {
        text: data.text,
        author: {
          connect: {
            id: data.author
          }
        },
        post: {
          connect: {
            id: data.post
          }
        }
      }
    }, info);
  },
  deleteComment(parent, { id }, { prisma }, info) {
    return prisma.mutation.deleteComment({
      where: { id }
    }, info);
  },
  updateComment(parent, { id, data }, { prisma }, info) {
    return prisma.mutation.updateComment({
      where: { id },
      data
    }, info);
  },
};

export default Mutation;
