// NORMALY WOULD BE BETTER FOR EACH MODEL TO HAVE OWN FILE
const database = require(`./../../db/mongodb.js`);
// user data needs username title userinput and numbers
class UserDataSchema {

  constructor(database) {
    this.db = database;
  }

  insertArbitrary() {

    const collection = this.db.collection('UserData');

    collection.insertMany([
      { a: 1 }, { a: 2 }, { a: 3 }
    ], function (err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });

  }
}
let a = database();
console.log("aaa",a.production);
let UserData = new UserDataSchema(a);

module.exports = UserData;