import { randomBytes } from "crypto";
import { UserRoles } from "../enums";
import { Users } from "../models";
import { encrypt, generateJWT } from "../utils";

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  role?: UserRoles;
  password: string;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

class UserService {
  public static async createUser(payload: CreateUserPayload) {
    try {
      const { firstName, lastName, email, role, password } = payload;
      const salt = randomBytes(32).toString("hex");
      const hashedPass = encrypt(salt, password);
      const user = await Users.create({
        firstName,
        lastName,
        email,
        role,
        salt,
        password: hashedPass,
      });
      return generateJWT({
        id: user.id,
        email,
        role: user.role,
        firstName,
        lastName,
      });
    } catch (err) {
      console.log("Error while creating user: ", err);
      throw new Error("Cannot create user, please try again later!");
    }
  }
  public static async getUserByEmail(email: string) {
    return await Users.findOne({ email });
  }
  public static async getUserById(id: string) {
    return await Users.findOne({ id });
  }
  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await this.getUserByEmail(email);
    if (!user) throw new Error("User not found");

    const {
      id,
      salt,
      password: userPassword,
      role,
      firstName,
      lastName,
    } = user;
    const hashedPass = encrypt(salt ?? "", password);

    if (hashedPass !== userPassword) throw new Error("Incorrect password");

    return generateJWT({
      id,
      email,
      role,
      firstName: firstName ?? "",
      lastName: lastName ?? "",
    });
  }
}

export default UserService;
