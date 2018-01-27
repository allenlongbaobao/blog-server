const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

let user = {
	name: String,
	password: String,
	email: String,
	createAt: Date,
}

let User = new Schema(user)
Mongoose.model('user', User)