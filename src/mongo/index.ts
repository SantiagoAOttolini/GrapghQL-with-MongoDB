import { Db, MongoClient } from "mongodb";
import config from '../config'

export default class MongoLib {
  private client: MongoClient;
  //any is because that variable can exist or can be undefined. 
  //We work with dynamic data, and the best wey is put -any-
  private dbName: any = config.dbName;
  private mongoUri: any = config.mongoUri;
  private static connection: Db;

  constructor() {
    this.client = new MongoClient(this.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async connect() {
    if (!MongoLib.connection) {
      try {
        await this.client.connect();
        console.log("Mongo DB connected successfully to mongo");
        MongoLib.connection = this.client.db(this.dbName);
      } catch (error) {
        console.log(error);
      }
    }
    return MongoLib.connection;
  }
}
