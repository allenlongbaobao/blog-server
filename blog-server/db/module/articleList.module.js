const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let articleList = new Schema({
  name: String
});

Mongoose.model('articleList', articleList);
