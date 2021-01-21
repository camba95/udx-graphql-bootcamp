import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ userId }, "supercoolsecret", { expiresIn: "7 days" });
};

export default generateToken;
