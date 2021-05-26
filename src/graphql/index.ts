import { GraphQLSchema } from "graphql";
import { makeExecutableSchema, mergeTypeDefs } from "graphql-tools";
import "graphql-import-node";
import game from "./schemas/game.graphql";
import character from "./schemas/character.graphql";
import { characterResolver } from "./resolvers/character";
import { gameResolver } from "./resolvers/game";
import developer from './schemas/developer.graphql'
import person from './schemas/person.graphql';
import { developerResolvers } from "./resolvers/developer";
import { personResolvers } from "./resolvers/person";

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([character, game, developer, person]),
  resolvers: [characterResolver, gameResolver, developerResolvers, personResolvers],
});
