import { Users } from "./users";

export const resolvers = {
  Query: {
    ...Users.resolvers.queries,
  },
  Mutation: {
    ...Users.resolvers.mutations,
  },
};
