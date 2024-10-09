import { Request } from "express";
import { verifyJWT } from "../utils";

export const context = async ({ req }: { req: Request }) => {
  let user = null;

  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(" ")[1] : null;

  if (token) {
    try {
      user = verifyJWT(token);
    } catch (err) {
      console.error("Invalid token: ", err);
    }
  }

  return { user };
};
