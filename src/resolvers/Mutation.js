import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getUserId from "../utils/getUserId";

const Mutation = {
  login: async (parent, { data }, { prisma }, info) => {
    const user = await prisma.query.user({
      where: {
        email: data.email
      }
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return {
      user,
      token: jwt.sign({ userId: user.id }, "supercoolsecret")
    }
  },
  createUser: async (parent, { data }, { prisma }, info) => {
    const emailTaken = await prisma.exists.User({ email: data.email });
    if (emailTaken) {
      throw new Error("Email taken.");
    }

    if (data.password.length < 8) {
      throw new Error("Password must be 8 characters or longer");
    }
    const password = await bcrypt.hash(data.password, 10);

    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password
      }
    });

    return {
      user,
      token: jwt.sign({ userId: user.id }, "supercoolsecret")
    }
  },
  deleteUser: async (parent, { id }, { prisma, request }, info) => {
    const userId = getUserId(request);
    return prisma.mutation.deleteUser({
      where: { id: userId }
    }, info);
  },
  updateUser: async (parent, { id, data }, { prisma, request }, info) => {
    const userId = getUserId(request);
    return prisma.mutation.updateUser({
      where: { id: userId },
      data
    }, info);
  },
  createPost: async (parent, { data }, { prisma, request }, info) => {
    const userId = getUserId(request);
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
            id: userId
          }
        }
      }
    }, info);
  },
  deletePost: async (parent, { id }, { prisma, request }, info) => {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: userId
      }
    });

    if (!postExists) {
      throw new Error("Unable to delete post.");
    }

    return prisma.mutation.deletePost({
      where: {
        id
      }
    }, info);
  },
  updatePost: async (parent, { id, data }, { prisma, request }, info) => {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: userId
      }
    });

    if (!postExists) {
      throw new Error("Unable to update post.");
    }

    return prisma.mutation.updatePost({
      where: { id },
      data
    }, info);
  },
  createComment(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.createComment({
      data: {
        text: data.text,
        author: {
          connect: {
            id: userId
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
  deleteComment: async (parent, { id }, { prisma, request }, info) => {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id,
      author: {
        id: userId
      }
    });

    if (!commentExists) {
      throw new Error("Unable to delete comment.");
    }

    return prisma.mutation.deleteComment({
      where: { id }
    }, info);
  },
  updateComment: async (parent, { id, data }, { prisma, request }, info) => {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id,
      author: {
        id: userId
      }
    });

    if (!commentExists) {
      throw new Error("Unable to update comment.");
    }

    return prisma.mutation.updateComment({
      where: { id },
      data
    }, info);
  },
};

export default Mutation;
