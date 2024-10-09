# graphql-boilerplate

This project is built using Node.js and Express.js for the backend, with Mongoose handling database interactions with MongoDB. The application exposes its functionality through a GraphQL API, which is implemented using Apollo Server to manage queries and mutations efficiently.

### Env Setup

Create a .env file and add the following variables

```
PORT=8000
DATABASE_URL="mongodb://localhost:27017/dbname"
JWT_SECRET="Template@x"

```

### Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## GraphQL

Access Apollo server to run GraphQL queries and mutations at `http://localhost:8000/graphql
`

### Query example

```js
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      firstName
      lastName
      email
      role
    }
  }
```

### Mutation example

```js
  mutation Signup($firstName: String!, $email: String!, $password: String!, $lastName: String, $role: UserRoles) {
    signup(firstName: $firstName, email: $email, password: $password, lastName: $lastName, role: $role)
  }

```

## Architecture

```
|- /src
  |- /graphql               - GraphQL application
    |- resolvers.ts         - Resolvers of all the collections
    |- typedefs.ts          - Typedefs of all the collections
    |- rule.ts              - Set autherization for resolvers
    |- index.ts             - GraphQL server
    |- /[collection]        - All GraphQL related items for a perticular collection
      |- resolvers.ts       - GraphQL queries and mutations
      |- typedefs.ts        - GraphQL typedefs
      |- index.ts           - All imports
  |- /lib                   - Mongo DB connector
  |- /middleware            - Middleware functions
  |- /models                - Mongo DB models/collections
  |- /services              - Collection wise services (CRUD operations)
  |- /utils                 - Helper functions
  |- index.ts               - Application main file
  |- enums.ts               - Contains enums used

```
