import { GraphQLError } from "graphql";

export const customGraphqlError = (message: string, code: string) => {
  return new GraphQLError(message, {
    extensions: {
      code,
    },
  });
};
