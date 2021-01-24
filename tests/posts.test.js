import "cross-fetch/polyfill";
import { gql } from "apollo-boost";
import prisma from "../src/prisma";
import { getClient } from "./utils/getClient";
import { seedDatabase, userOne, postOne, postTwo } from "./utils/seedDatabase";
import { getPosts, myPosts, updatePost, createPost, deletePost } from "./utils/operations";

jest.setTimeout(20000);

const client = getClient();

beforeEach(seedDatabase);

test("Should expose published posts", async () => {
  const { data } = await client.query({ query: getPosts });

  expect(data.posts.length).toBe(1);
  expect(data.posts[0].published).toBe(true);
});

test("Should fetch users posts", async () => {
  const client = getClient(userOne.jwt);

  const { data } = await client.query({ query: myPosts });

  expect(data.myPosts.length).toBe(2);
});

test("Should be able to update own post", async () => {
  const client = getClient(userOne.jwt);

  const variables = {
    id: postOne.post.id,
    data: {
      published: false
    }
  };

  const { data } = await client.mutate({
    mutation: updatePost,
    variables
  });

  expect(data.updatePost.published).toBe(false);
});

test("Should create a new post", async () => {
  const client = getClient(userOne.jwt);
  const variables = {
    data: {
      title: "New Post",
      body: "",
      published: true
    }
  }

  const { data } = await client.mutate({
    mutation: createPost,
    variables
  });

  expect(data.createPost.title).toBe("New Post");
  expect(data.createPost.published).toBe(true);
});

test("Should delete post", async () => {
  const client = getClient(userOne.jwt);
  const variables = { id: postTwo.post.id };


  await client.mutate({
    mutation: deletePost,
    variables
  });
  const exists = await prisma.exists.Post({
    id: postTwo.post.id
  });

  expect(exists).toBe(false);
});
