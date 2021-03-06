const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// var dotenv = require('dotenv');
// var path = require('path');

// let env = process.env.ENVIRONMENT || 'dev'
// dotenv.config({ path: path.resolve(__dirname, `../../config/${env}.env`) });

// Connection URL
let url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

// Database Name
const dbName = process.env.MONGODB_DB || 'mdbMessAround';
url = url + dbName

// Use connect method to connect to the server

function mdb(){

  MongoClient.connect(url, { useNewUrlParser: true } , function (err, client) {
    assert.equal(null, err);
    

    const db = client.db(dbName);


  });


}

function connect(url) {
  // https://blog.mlab.com/2017/05/mongodb-connection-pooling-for-express-applications/
  return MongoClient.connect(url, { useNewUrlParser: true }).then(client => {
  let db = client.db(dbName);
    //console.log(db,"sucess yoyo");
    return db;
  })
}

class SubjectData {

  constructor(database){
    this.db = database;
  }

  insertArbitrary(){
    
    const collection = this.db.collection('SubjectData');    
    
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





module.exports = async function () {
  let databases = await Promise.resolve(connect(url))

  return {
    production: databases,
  
  }
}