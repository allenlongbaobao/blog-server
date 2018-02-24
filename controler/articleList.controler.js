require('../db/model/articleList.model.js')
const express = require('express')
const Mongoose = require('mongoose')
const router = express.Router();
const promise = require('promise')
const modelArticleList = Mongoose.model('articleList')
Mongoose.Promise = promise


// 获取文章集列表
let getArticleList = function(req, res) {
	modelArticleList.find().then(data=>{
	    res.jsonp({
	      data: data
	    })
	  }).catch(err=>{
	    console.log(err)
	    res.status(400).send({
	      message: 'get article list fail'
	    })
	  })
}

// 新增文章集
let addArticleList = function (req, res) {
	const articleList = new modelArticleList(req.body)
	  articleList.save(()=>{
	    console.log('增加文章集成功：' + articleList)
	    res.jsonp({
	      data: articleList
	    })
	  }, (err)=>{
	    console.log(err)
	    res.status(400).send({
	      message: "add articlelist fail"
	    })
	  })
}

//删除文章集
let removeArticleList = function (req, res) {
	let id = req.body
	console.log(id)
	modelArticleList.findByIdAndRemove(id).then((response)=>{
	  console.log('删除文章集成功', response)
	  res.jsonp({
	    data: response
	  })
	}, (err)=>{
	})
}

module.exports = {
	getArticleList: getArticleList,
	addArticleList: addArticleList,
	removeArticleList: removeArticleList
}