export const typedefs = `#graphql
    type Users {
        id: ID
        firstName: String!
        lastName: String
        email: String!
        createdAt: String
        updatedAt:String
        role: String!
        phone: String
      }
`;

export const resolverTypedefs = {
  queries: `#graphql
    me: Users
    getUserByEmail(email: String!): Users
    login(email: String!, password: String!): String
`,
  mutations: `#graphql
    signup(firstName: String!, lastName: String, email: String!, role: UserRoles, password: String!): String
`,
};
