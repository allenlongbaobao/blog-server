const test = require('assert');
const Promise = require('promise');
const Mongoose = require('mongoose');
const config = require('./config/config')
// Database Name
const dbName = config.mongo.db;
// Connection url
const url = 'mongodb://localhost:27017/' + dbName;
// Connect using MongoClient

Mongoose.Promise = Promise;

const Schema = Mongoose.Schema;
let schemas = {};
let Modules = {};
let data= {
  noteList:{
    Lid: null,
    name: 'test list'
  },
  noteName: 'test not ',
  noteLink: 'link',
  publish: true
}
let databook = {
  name: 'testbook'
}
initialDataBase = function () {
  Mongoose.connect(url);
  loadCollection();
  return new Promise(function(resolve, refuse){
    new Mongoose.connect(url).then(() => {
      resolve(loadCollection());
    }, (err) => {
      refuse(err);
    })
  })
}

loadCollection = function () {
  for (let s in config.schema){
    let name = config.schema[s].schemaName;
    let rule = new Schema(config.schema[s].schemaRule);
    Modules[name] = Mongoose.model(name, rule);
  }
  Modules['articleBook'].create(databook).then((res)=>{
    Modules['article'].create(data).then((res)=>{
      console.log(res);
    })
    console.log(res);
  })
}
  /*
  new MongoClient.connect(url).then((response) => {
    DbClient = response.db(dbName)
    callback()
  },(response) => {
    console.log(response)
    callback()
  })
  */
  // List all the available databases
    /*
    adminDb.listDatabases(function(err, dbs) {
      test.equal(null, err);
      test.ok(dbs.databases.length > 0);
      console.log(dbs.databases);
      client.close();
    });
    */

// Add
Add = function (collectionName, singleRecord, callback) {

}

// Remove
Remove = function (callback) {

}

// Fetch
Fetch = function (callback) {

}

// Change
Change = function (callback) {

}

// get db
getDb = function () {
  return initialDataBase()
  /*
  if(!DbClient){
    initialDataBase(function(){
      callback(DbClient);
    })
  }else{
    callback(DbClient);
  }
  */
}

shutDownDb = function (callback){
  DbClient.close();
  DbClient = null;
  callback();
}

module.exports = {
  getDb: getDb,
  shutDownDb:shutDownDb
}
