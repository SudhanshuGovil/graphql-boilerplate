import { expressMiddleware } from "@apollo/server/express4";
import express, { Express } from "express";
import dotenv from "dotenv";
import createGqlServer from "./graphql";
import connectDb from "./lib/db";
import { context } from "./middleware";

dotenv.config();

async function init() {
  const app: Express = express();
  const port = process.env.PORT ?? 8000;

  // Connect with mongoose
  connectDb(String(process.env.DATABASE_URL));

  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(await createGqlServer(), {
      context,
    })
  );

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

init();
