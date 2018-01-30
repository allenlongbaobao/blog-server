const Promise = require('promise');
const Mongoose = require('mongoose');
const Config = require('../config/config');

const dbName = Config.mongo.db;
const url = 'mongodb://localhost:27017/' + dbName;

exports.openDB = function () {
  Mongoose.connect(url);
  const db = Mongoose.connection;
  db.on('error', console.error.bind(console, 'mongoose error'));
  db.on('open', () => {
    console.log('connect to database successfully!');
  });
  return db;
}
