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

export const userTwo = {
  input: {
    name: "Marco Montero",
    email: "marco@mail.com",
    password: bcrypt.hashSync("another123")
  },
  user: undefined,
  jwt: undefined
};

export const postOne = {
  input: {
    title: "My Public Post",
    body: "This is an awesome post",
    published: true,
  },
  post: undefined
};

export const postTwo = {
  input: {
    title: "My Draft Post",
    body: "This is an awesome post",
    published: false,
  },
  post: undefined
};

export const commentOne = {
  input: {
    text: "Hi there, I like your post"
  },
  comment: undefined
};

export const commentTwo = {
  input: {
    text: "Thanks :)"
  },
  comment: undefined
};

export const seedDatabase = async () => {
  // Delete test data
  await prisma.mutation.deleteManyComments();
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();

  // Create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  // Create user two
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);

  // Create post one
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });

  // Create post two
  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });

  // Create comment one
  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      author: {
        connect: {
          id: userTwo.user.id
        }
      },
      post: {
        connect: {
          id: postOne.post.id
        }
      }
    }
  });

  // Create comment two
  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      },
      post: {
        connect: {
          id: postOne.post.id
        }
      }
    }
  });
};
