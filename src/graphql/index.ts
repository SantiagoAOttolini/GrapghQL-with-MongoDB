import { GraphQLSchema } from "graphql";
import { makeExecutableSchema, mergeTypeDefs } from "graphql-tools";
import "graphql-import-node";
import game from "./schemas/game.graphql";
import character from "./schemas/character.graphql";
import { characterResolver } from "./resolvers/character";
import { gameResolver } from "./resolvers/game";
import developer from './schemas/developer.graphql'
import { developerResolvers } from "./resolvers/developer";

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([character, game, developer]),
  resolvers: [characterResolver, gameResolver, developerResolvers],
});
