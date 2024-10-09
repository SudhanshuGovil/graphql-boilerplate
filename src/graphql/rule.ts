import { UserRoles } from "../enums";

const { ADMIN, ANONYMOUS, USER } = UserRoles;

const isAdmin = [ADMIN];
const isAuthenticated = [ADMIN, USER];
const anyone = [ANONYMOUS, ...isAuthenticated];

export const rules = {
  Query: {
    login: anyone,
    me: isAuthenticated,
    getUserByEmail: isAdmin,
  },
  Mutation: {
    signup: anyone,
  },
};
