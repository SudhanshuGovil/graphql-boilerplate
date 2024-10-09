import { resolvers } from "./resolvers";
import { typedefs, resolverTypedefs } from "./typedefs";

const { mutations, queries } = resolverTypedefs;

export const Users = {
  mutations,
  queries,
  resolvers,
  typedefs,
};
