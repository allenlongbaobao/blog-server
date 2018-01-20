const Db = require('mongodb').Db
const Server = require('mongodb').Server
const MongoClient = require('mongodb').Client
const ObjectID = require('mongodb').ObjectID
const config = require('./config/config')

let db = null

initMongoClient = function (callback) {
  if (db) {
    callback()
  }else{
    db = new Db(config.mongo.db, new Server(config.mongo.host, config.mongo.port), w = config.mongo.writeConern)
    db.open((err, db) => {
      if(err){
        throw err
      }
      console.log(db)
      callback()
    })
  }
}

getDb = function (callback){
  if (!db) {
    initMongoClient(function(){
      callback(db)
    })
  }else{
    callback(db)
  }

}
module.exports = {
  getDb: getDb
}
