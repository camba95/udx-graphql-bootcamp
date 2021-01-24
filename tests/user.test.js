import "cross-fetch/polyfill";
import { gql } from "apollo-boost";
import prisma from "../src/prisma";
import { seedDatabase, userOne } from "./utils/seedDatabase";
import { getClient } from "./utils/getClient";

jest.setTimeout(20000);

const client = getClient();

beforeEach(seedDatabase);

test("Should create a new user", async () => {
  const createUser = gql`
    mutation {
      createUser(data: {
        name: "Ricardo Suarez",
        email: "ricky@mail.com",
        password: "control123"
      }) {
        token
        user {
          id
          name
          email
        }
      }
    }
  `;

  const { data } = await client.mutate({ mutation: createUser });

  const exists = await prisma.exists.User({
    id: data.createUser.user.id
  });

  expect(exists).toBe(true);
});

test("Should expose public author profiles", async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `;

  const { data } = await client.query({ query: getUsers });

  expect(data.users.length).toBe(1);
  expect(data.users[0].email).toBe(null);
  expect(data.users[0].name).toBe("Kevin Alvarez");
});

test("Should not login with bad credentials", async () => {
  const login = gql`
    mutation {
      login(data: {
        email: "fail@mail.com",
        password: "12345"
      }) {
        token
      }
    }
  `;

  expect(
    client.mutate({ mutation: login })
  ).rejects.toThrow();
});

test("Should not sign up user with invalid user", async () => {
  const createUser = gql`
    mutation {
      createUser(data: {
        name: "Ricardo Suarez",
        email: "ricky@mail.com",
        password: "abc123"
      }) {
        token
        user {
          id
          name
          email
        }
      }
    }
  `;

  expect(
    client.mutate({ mutation: createUser })
  ).rejects.toThrow();
});

test("Should fetch user profile", async () => {
  const client = getClient(userOne.jwt);
  const getProfile = gql`
    query {
      me {
        id
        name
        email
      }
    }
  `;

  const { data } = await client.query({ query: getProfile });

  expect(data.me.id).toBe(userOne.user.id);
});
