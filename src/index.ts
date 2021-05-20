import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";
import MongoLib from './mongo'
import config from "./config"

const app = express();
app.use(cors());

const server = new ApolloServer({
  schema,
  //playground: Enable client for request
  playground: true,
  introspection: true,
  //When the graphql server init, put inisde the context a new instance of mongo db
  context: async () => new MongoLib().connect()
});

server.applyMiddleware({ app });

app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}/graphql`);
});
