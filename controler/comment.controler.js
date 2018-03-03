require('../db/model/comment.model.js')
const express = require('express')
const Mongoose = require('mongoose')
const router = express.Router();
const promise = require('promise')
const modelComment = Mongoose.model('comment')
Mongoose.Promise = promise

let addReply = function (body, res) {
	modelComment.findByIdAndUpdate({aid: body.id},{$push: {"childComment":body}},{safe:true,upsert:true}).then(result => {
		console.log('addReply', result)
		res.status(200).send()
	}).catch(err => {
		res.status(500).send({
			code: '1203',
			message: '增加回复失败'
		})
	})
}

let getAllComments = function (req, res) {
	let aid = req.body.id
	console.log('getAllComments', aid)
	modelComment.find({aid}).sort({date: -1}).then(result => {
		res.jsonp({
			data: result
		})
	}).catch(err => {
		res.status(500).send({
			code: '1201',
			message: '获取评论失败'
		})
	})
}

let addComment = function (req, res) {
	if (req.cid) {
		addReply(req.body, res)
	} else {
		req.body._id = Mongoose.Types.ObjectId()
		let date = new Date()
	  req.body.date = date.toLocaleString('zn-CN', {hour12: false, timeZone: 'UTC', timeZoneName: 'short'})
		console.log('addComment', req.body)
		const comment = new modelComment(req.body)
		comment.save().then(result => {
			res.jsonp({
				data: result
			})
		}).catch(err => {
			console.log(err)
			res.status(500).send({
				code: '1202',
				message: '增加评论失败'
			})
		})
	}
}

let addLikeToComment = function (req, res) {
	modelComment.findByIdAndUpdate(req.body.cid, {$inc: {'likeNum': 1}}, {new: true}).then(result => {
		console.log('增加点赞数', result)
		res.jsonp({
			data: result.likeNum
		})
	}).catch(err => {
		res.status(500).send({
			code: '1204',
			message: '增加点赞数失败'
		})
	})
}

let removeLikeFromComment = function (req, res) {
	modelComment.findByIdAndUpdate(req.body.cid, {$inc: {'likeNum': -1}}, {new: true}).then(result => {
		console.log('取消点赞', result)
		res.jsonp({
			data: result.likeNum
		})
	}).catch(err => {
		res.status(500).send({
			code: '1205',
			message: '取消点赞失败'
		})
	})
}

let addDis = function (req, res) {
}

module.exports = {
	getAllComments,
	addComment,
	addLikeToComment,
	removeLikeFromComment,
	addDis
}