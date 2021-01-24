import bcrypt from "bcryptjs";
import prisma from "../../src/prisma";

export const seedDatabase = async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  const user = await prisma.mutation.createUser({
    data: {
      name: "Kevin Alvarez",
      email: "kevin@mail.com",
      password: bcrypt.hashSync("control123")
    }
  });
  await prisma.mutation.createPost({
    data: {
      title: "My Public Post",
      body: "This is an awesome post",
      published: true,
      author: {
        connect: {
          id: user.id
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
          id: user.id
        }
      }
    }
  });
};
