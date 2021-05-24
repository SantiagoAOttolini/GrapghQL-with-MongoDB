import { IResolvers } from "graphql-tools";
import data from "../../data/data.json";
import { Db, ObjectId } from "mongodb";
import { CHARACTER_COLLECTION } from "../../mongo/collections";

export const characterResolver: IResolvers = {
  Query: {
    async getCharacters(root: void, args: void, context: Db) {
      try {
        return await context.collection(CHARACTER_COLLECTION).find().toArray();
      } catch (error) {
        console.log(error);
      }
    },
    getCharacter(root: void, args: any) {
      const [find] = data.characters.filter((ch) => ch._id === args._id);
      return find;
    },
  },
  Mutation: {
    async createCharacter(root: void, args: any, context: Db) {
      try {
        await context
          .collection(CHARACTER_COLLECTION)
          .insertOne(args.character);
        data.characters.push(args.character);
        return "Character added successfully";
      } catch (error) {
        console.log(error);
      }
    },
  },
  Character: {
    async games(parent: any, args: void, context: Db) {
      const gameList = parent.games.map(
        async (gameId: string) =>
          await context
            .collection(CHARACTER_COLLECTION)
            .findOne({ _id: new ObjectId(gameId) })
      );

      return gameList;
    },
  },
};
