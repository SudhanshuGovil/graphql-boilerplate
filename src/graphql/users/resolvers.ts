import {
  UserService,
  CreateUserPayload,
  GetUserTokenPayload,
} from "../../services";
import { authGuard, customGraphqlError } from "../../utils";

const queries = {
  me: authGuard(async (_: any, __: any, context: any) => {
    const { user } = context;
    if (!user) {
      throw customGraphqlError("Invalid/Expired token", "AUTHENTICATION_ERROR");
    }

    const currentUser = await UserService.getUserById(user.userId);
    return currentUser;
  }),
  getUserByEmail: authGuard(async (_: any, { email }: { email: string }) => {
    try {
      return await UserService.getUserByEmail(email);
    } catch (error: any) {
      console.log("Error while getUserByEmail: ", error);
      throw new Error(error);
    }
  }),
  login: authGuard(async (_: any, payload: GetUserTokenPayload) => {
    try {
      return await UserService.getUserToken(payload);
    } catch (error: any) {
      console.log("Error while getUserByEmail: ", error);
      throw new Error(error);
    }
  }),
};

const mutations = {
  signup: authGuard(async (_: any, payload: CreateUserPayload, __: any) => {
    try {
      return await UserService.createUser(payload);
    } catch (error: any) {
      console.log("Error while createUser: ", error);
      throw new Error(error);
    }
  }),
};

export const resolvers = {
  queries,
  mutations,
};
