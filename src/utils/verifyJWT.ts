import { GraphQLError } from "graphql";
import JWT from "jsonwebtoken";
import { customGraphqlError } from "./customGraphqlError";

const JWT_SECRET = String(process.env.JWT_SECRET);

export const verifyJWT = (token: string) => {
  try {
    return JWT.verify(token, JWT_SECRET);
  } catch (error) {
    console.log("Error in verifyJWT: ", error);
    throw customGraphqlError("Invalid/Expired token", "AUTHENTICATION_ERROR");
  }
};
