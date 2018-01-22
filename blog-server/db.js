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
  return new Promise(function(resolve, refuse){
    new Mongoose.connect(url).then(() => {
      loadCollection();
      resolve();
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
}

// Add
Add = function (collectionName, singleRecord) {
  getDb().then(()=>{
    Modules[collectionName].create(singleRecord).then((entity)=>{
      entity.save()
    });
  },(err)=>{
    console.log(err);
  })
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
  if(Modules.length == 0){
    return initialDataBase();
  }
}

shutDownDb = function (){
  DbClient.close();
  DbClient = null;
}

module.exports = {
  getDb: getDb,
  Add: Add,
  shutDownDb:shutDownDb
}
