const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let articleList = new Schema({
  name: String,
  articleNum: Number
});

Mongoose.model('articleList', articleList);
