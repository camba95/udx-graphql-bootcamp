import uuidv4 from "uuid/v4";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const { users } = db
    const { data } = args;
    const emailTaken = users.some((user) => user.email === data.email);
    if (emailTaken) {
      throw new Error("Email taken.");
    }
    const user = {
      id: uuidv4(),
      ...data
    };
    users.push(user);
    return user;
  },
  deleteUser(parent, args, { db }, info) {
    let { users, posts, comments } = db;
    const userIndex = users.findIndex((user) => user.id === args.id);
    if (userIndex === -1) {
      throw new Error("User not found.");
    }

    const [deletedUser] = users.splice(userIndex, 1);
    posts = posts.filter((post) => {
      const match = post.author === args.id;
      if (match) {
        comments = comments.filter((comment) => comment.post !== post.id);
      }
      return !match;
    });
    comments = comments.filter((comment) => comment.author !== args.id);

    return deletedUser;
  },
  updateUser(parent, args, { db }, info) {
    let { users } = db;
    const { id, data } = args;
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new Error("User not found.");
    }

    if (typeof data.email === "string") {
      const emailTaken = users.some((user) => user.email === data.email);
      if (emailTaken) {
        throw new Error("Email taken.");
      }
      user.email = data.email;
    }

    if (typeof data.name === "string") {
      user.name = data.name;
    }

    if (typeof data.age !== "undefined") {
      user.age = data.age;
    }

    return user;
  },
  createPost(parent, args, { db }, info) {
    const { data } = args;
    const { users, posts } = db
    const userExists = users.some((user) => user.id === data.author);
    if (!userExists) {
      throw new Error("User not found.");
    }
    const post = {
      id: uuidv4(),
      ...data

    };
    posts.push(post);
    return post;
  },
  deletePost(parent, args, { db }, info) {
    let { posts, comments } = db
    const postIndex = posts.findIndex((post) => post.id === args.id);
    if (postIndex === -1) {
      throw new Error("Post not found.");
    }

    const [deletedPost] = posts.splice(postIndex, 1);
    comments = comments.filter((comment) => comment.post !== args.id);

    return deletedPost;
  },
  updatePost(parent, args, { db }, info) {
    let { posts } = db;
    const { id, data } = args;
    const post = posts.find((post) => post.id === id);
    if (!post) {
      throw new Error("Post not found.");
    }

    if (typeof data.title === "string") {
      post.title = data.title;
    }

    if (typeof data.body === "string") {
      post.body = data.body;
    }

    if (typeof data.published === "boolean") {
      post.published = data.published;
    }

    return post;
  },
  createComment(parent, args, { db }, info) {
    const { users, posts, comments } = db
    const { data } = args;
    const userExists = users.some((user) => user.id === data.author);
    const postExists = posts.some((post) => post.id === data.post && post.published);
    if (!userExists) {
      throw new Error("User not found.");
    }
    if (!postExists) {
      throw new Error("Post not found.");
    }
    const comment = {
      id: uuidv4(),
      ...data
    };
    comments.push(comment);
    return comment;
  },
  deleteComment(parent, args, { db }, info) {
    let { comments } = db
    const commentIndex = comments.findIndex((comment) => comment.id === args.id);
    if (commentIndex === -1) {
      throw new Error("Comment not found.");
    }

    const [deletedComment] = comments.splice(commentIndex, 1);

    return deletedComment;
  },
  updateComment(parent, args, { db }, info) {
    let { comments } = db;
    const { id, data } = args;
    const comment = comments.find((comment) => comment.id === id);
    if (!comment) {
      throw new Error("Comment not found.");
    }

    if (typeof data.text === "string") {
      comment.text = data.text;
    }

    return comment;
  },
};

export default Mutation;
