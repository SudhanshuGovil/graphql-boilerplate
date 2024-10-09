import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

async function createGqlServer() {
  //Create graphql server
  const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  //Start graphql server
  await gqlServer.start();
  return gqlServer;
}

export default createGqlServer;
