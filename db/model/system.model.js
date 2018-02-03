const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

let system = {
  name: String,
  visitedNum: Number
}

let System = new Schema(system)
Mongoose.model('system', System)
