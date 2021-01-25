import "cross-fetch/polyfill";
import prisma from "../src/prisma";
import { seedDatabase, userOne } from "./utils/seedDatabase";
import { getClient } from "./utils/getClient";
import { createUser, getUsers, login, getProfile } from "./utils/operations";

jest.setTimeout(20000);

const client = getClient();

beforeEach(seedDatabase);

test("Should create a new user", async () => {
  const variables = {
    data: {
      name: "Ricardo Suarez",
      email: "ricky@mail.com",
      password: "control123"
    }
  };
  const { data } = await client.mutate({
    mutation: createUser,
    variables
  });

  const exists = await prisma.exists.User({
    id: data.createUser.user.id
  });

  expect(exists).toBe(true);
});

test("Should expose public author profiles", async () => {
  const { data } = await client.query({ query: getUsers });

  expect(data.users.length).toBe(2);
  expect(data.users[0].email).toBe(null);
  expect(data.users[0].name).toBe("Kevin Alvarez");
});

test("Should not login with bad credentials", async () => {
  const variables = {
    data: {
      email: "fail@mail.com",
      password: "12345"
    }
  };

  expect(
    client.mutate({
      mutation: login,
      variables
    })
  ).rejects.toThrow();
});

test("Should not sign up user with invalid user", async () => {
  const variables = {
    data: {
      name: "Ricardo Suarez",
      email: "ricky@mail.com",
      password: "abc123"
    }
  }

  expect(
    client.mutate({
      mutation: createUser,
      variables
    })
  ).rejects.toThrow();
});

test("Should fetch user profile", async () => {
  const client = getClient(userOne.jwt);

  const { data } = await client.query({ query: getProfile });

  expect(data.me.id).toBe(userOne.user.id);
});
