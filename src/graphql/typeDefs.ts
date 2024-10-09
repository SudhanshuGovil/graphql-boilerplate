import { Users } from "./users";

export const typeDefs = `
#graphql
#Define queries here
type Query {
    ${Users.queries}
} 

#Define mutations here
type Mutation {
    ${Users.mutations}
}

#Define collections here
${Users.typedefs}

#Define inputs here

#Define enums here
enum UserRoles {
    ADMIN,
    ANONYMOUS,
    SUPER_ADMIN,
    USER,
}
`;
