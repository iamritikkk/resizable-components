import mongoose from "mongoose";

export class Mongo {
  constructor({ url }) {
    this.url = url;
  }

  /**
   * @description - connect to mongodb
   * @returns {Promise<void>}
   */
  connect() {
    return new Promise((resolve, reject) => {
      mongoose.connect(this.url);
      const db = mongoose.connection;
      db.on(`error`, (err) => {
        console.error(`connection error: ${err}`);
        reject(err);
      });
      db.once(`open`, () => {
        console.log(`connected to database ${this.url}`);
        resolve();
      });
    });
  }
}
