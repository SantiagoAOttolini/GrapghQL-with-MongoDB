import { GraphQLSchema } from "graphql";
import { makeExecutableSchema, mergeTypeDefs } from "graphql-tools";
import "graphql-import-node";
import game from "./schemas/game.graphql";
import character from "./schemas/character.graphql";
import { characterResolver } from "./resolvers/character";
import { gameResolver } from "./resolvers/game";

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([character, game]),
  resolvers: [characterResolver, gameResolver],
});
