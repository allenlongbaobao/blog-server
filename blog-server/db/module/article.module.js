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
  publish: Boolean,
  publishAt: Date
}

let Article = new Schema(article);
Mongoose.model('article', Article);
