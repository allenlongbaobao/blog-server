const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

let comment = {
	aid: Schema.Types.ObjectId,
	content: String,
	user: {
		name: String,
		email: String,
		blog: String
	},
	likeNum: Number,
	disNum: Number,
	date: Date,
	childComment: [{
		content: String,
		user: String,
		likeNum: Number,
		disNum: Number,
		date: String
	}]
}

let Comment = new Schema(comment)
Mongoose.model('comment', Comment)
