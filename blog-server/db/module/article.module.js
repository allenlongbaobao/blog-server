const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let article = {
  articleList: {
    Lid: Schema.Types.ObjectId,
    name: String
  },
  articleName: String,
  articleLink: String,
  articleContent: String,
  publish: Boolean
}

let Article = new Schema(article);
Mongoose.model('article', Article);
