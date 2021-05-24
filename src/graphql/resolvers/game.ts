import { IResolvers } from "graphql-tools";
import { Db, ObjectId } from "mongodb";
import {
  GAME_COLLECTION,
  DEVELOPERS_COLLECTION,
} from "../../mongo/collections";

export const gameResolver: IResolvers = {
  Query: {
    async gameGame(root: void, args: any, context: Db) {
      try {
        return await context.collection(GAME_COLLECTION).find().toArray();
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async createGame(root: void, args: any, context: Db) {
      try {
        await context.collection(GAME_COLLECTION).insertOne(args.game);
        return `Game ${args.game.title} added successuflly`;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Game: {
    async developers(parent: any, args: void, context: Db) {
      const devList = parent.developers.map(async (id: string) => {
        return await context
          .collection(DEVELOPERS_COLLECTION)
          .findOne({ _id: new ObjectId(id) });
      });
      return devList;
    },
  },
};
