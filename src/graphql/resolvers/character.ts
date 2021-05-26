import { IResolvers } from "graphql-tools";
import data from "../../data/data.json";
import { Db, ObjectId } from "mongodb";
import { CHARACTER_COLLECTION, GAME_COLLECTION } from "../../mongo/collections";
import { ICharacter } from "../../interfaces/ICharacter";

export const characterResolver: IResolvers = {
  Query: {
    async getCharacters(root: void, args: void, context: Db) {
      try {
        return await context.collection(CHARACTER_COLLECTION).find().toArray();
      } catch (error) {
        console.log(error);
      }
    },
    async getCharacter(root: void, args: any, context: Db) {
      const find = await context
        .collection(CHARACTER_COLLECTION)
        .findOne({ _id: new ObjectId(args._id) });
      return find;
    },
  },
  Mutation: {
    async createCharacter(root: void, args: any, context: Db) {
      try {
        const regexp = new RegExp(args.character.name, "i");
        const exists = await context
          .collection(CHARACTER_COLLECTION)
          .findOne({ name: args.character.name });
        if (exists) {
          return "Character already exist";
        }
        await context
          .collection(CHARACTER_COLLECTION)
          .insertOne(args.character);

        return "Character added successfully";
      } catch (error) {
        console.log(error);
      }
    },
    async editCharacter(
      root: void,
      { _id, character }: { _id: string; character: ICharacter },
      context: Db
    ) {
      try {
        const exist = await context
          .collection(CHARACTER_COLLECTION)
          .findOne({ _id: new ObjectId(_id) });

        if (exist) {
          await context
            .collection(CHARACTER_COLLECTION)
            .updateOne({ _id: new ObjectId(_id) }, { $set: character });

          return "Character updated successfully";
        }

        throw new Error("Character does not exist");
      } catch (error) {
        console.log(error);
        return error.message;
      }
    },
  },
  Character: {
    async games(parent: ICharacter, args: void, context: Db) {
      const gameList = parent.games.map(
        async (gameId) =>
          await context
            .collection(GAME_COLLECTION)
            .findOne({ _id: new ObjectId(gameId) })
      );

      return gameList;
    },
  },
};
