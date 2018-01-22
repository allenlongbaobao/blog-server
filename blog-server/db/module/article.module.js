const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let article = {
  noteList: {
    Lid: Schema.Types.ObjectId,
    name: String
  },
  noteName: String,
  noteLink: String,
  noteContent: String,
  publish: Boolean
}

let Article = new Schema(article);
Mongoose.model('article', Article);
