import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../src/prisma";

export const userOne = {
  input: {
    name: "Kevin Alvarez",
    email: "kevin@mail.com",
    password: bcrypt.hashSync("control123")
  },
  user: undefined,
  jwt: undefined
};

export const seedDatabase = async () => {
  // Delete test data
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();

  // Create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);
  
  // Create posts
  await prisma.mutation.createPost({
    data: {
      title: "My Public Post",
      body: "This is an awesome post",
      published: true,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });
  await prisma.mutation.createPost({
    data: {
      title: "My Draft Post",
      body: "This is an awesome post",
      published: false,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });
};
