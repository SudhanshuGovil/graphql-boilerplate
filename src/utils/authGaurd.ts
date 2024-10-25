import { GraphQLResolveInfo } from "graphql";
import { customGraphqlError } from "./customGraphqlError";
import { rules } from "../graphql/rule";
import { UserRoles } from "../enums";

type ResolverFn = (
  parent: any,
  args: any,
  context: { user?: any },
  info: GraphQLResolveInfo
) => any;

export const authGuard =
  (resolver: ResolverFn) =>
  (parent: any, args: any, context: any, info: GraphQLResolveInfo) => {
    const { key, typename } = info.path;
    //@ts-ignore
    const permissions = rules?.[typename]?.[key];
    if (!permissions.includes(UserRoles.ANONYMOUS)) {
      const { user } = context;
      if (!user) {
        throw customGraphqlError("Not Authenticated", "AUTHENTICATION_ERROR");
      }
      if (!permissions.includes(user.role)) {
        throw customGraphqlError("Not Authorized", "AUTHORIZATION_ERROR");
      }
    }
    return resolver(parent, args, context, info);
  };
