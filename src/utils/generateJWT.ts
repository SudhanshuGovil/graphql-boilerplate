import JWT from "jsonwebtoken";

interface JWTInput {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
}

const JWT_SECRET = String(process.env.JWT_SECRET);

export const generateJWT = (payload: JWTInput) => {
  const { id, email, role, firstName, lastName } = payload;
  const token = JWT.sign({ id, email, role, firstName, lastName }, JWT_SECRET, {
    expiresIn: "2h",
  });
  return token;
};
