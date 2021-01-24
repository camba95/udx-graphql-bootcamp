import "cross-fetch/polyfill";
import { gql } from "apollo-boost";
import { getClient } from "./utils/getClient";
import { seedDatabase, userOne } from "./utils/seedDatabase";

jest.setTimeout(20000);

const client = getClient();

beforeEach(seedDatabase);

test("Should expose published posts", async () => {
  const getPosts = gql`
    query {
      posts {
        id
        title
        published
      }
    }
  `;

  const { data } = await client.query({ query: getPosts });

  expect(data.posts.length).toBe(1);
  expect(data.posts[0].published).toBe(true);
});

test("Should fetch users posts", async () => {
  const client = getClient(userOne.jwt);
  const myPosts = gql`
    query {
      myPosts {
        id
        title
        published
      }
    }
  `;

  const { data } = await client.query({ query: myPosts });

  expect(data.myPosts.length).toBe(2);
});
