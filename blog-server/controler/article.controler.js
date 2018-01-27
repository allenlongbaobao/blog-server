require('../db/module/article.module.js')
require('../db/module/articleList.module.js')
const express = require('express')
const Mongoose = require('mongoose')
const router = express.Router();
const promise = require('promise')
const moduleArticleList = Mongoose.model('articleList')
const moduleArticle = Mongoose.model('article')
Mongoose.Promise = promise


let addArticle = function (body, res) {
  body._id = Mongoose.Types.ObjectId()
  const article = new moduleArticle(body);
  article.save().then((response)=>{
    console.log('新增文章成功', response)
    res.jsonp({
      data: [article]
    })
    return body.articleList.Lid
  }).then(numPlusInArticleList)
}

let modifyArticle = function (body, res) {
  moduleArticle.findByIdAndUpdate(body._id, body, {new: true}).then((response) => {
    console.log("修改文章成功", response)
    res.jsonp({
      data: [response]
    })
  })
}

let numPlusInArticleList = function (id) {
  moduleArticleList.update({_id: id}, {$inc:{articleNum: 1}}, response=>{
    console.log('增加数量成功' + response)

  })
}

let numSubInArticleList = function (id) {
  console.log('删除文章后－－1' + id)
  moduleArticleList.update({_id: id}, {$inc:{articleNum: -1}}, response=>{
    console.log('response:' + response)
  })
}


// 获取所有文章
let getAllArticle = function (req, res) {
	moduleArticle.find().then(data => {
	    res.jsonp({
	      data: data
	    })
  }).catch(err => {
    console.log(err)
    res.status(400).send({
      message: 'get all articles fail'
    })
  })
}

// 根据id获取文章
let getArticleById = function (req, res) {
	moduleArticle.findById(req.body.id).then(data=>{
		res.jsonp({
		  data: data
		})
	}).catch(err=>{
	console.log(err)
		res.status(400).send({
		  message: 'get article fail'
		})
	})
}

let getPublishArticleInOneListById = function (req, res) {
  moduleArticle.find({'articleList.Lid':req.body.id, 'publish': true}).then(response => {
    res.jsonp({
      data: response
    })
  })
}

// 新增文章
let addOrModifyArticle = function (req, res) {
  let id = req.body.articleList.Lid
  if(!req.body._id){
    addArticle(req.body, res)
  }else{
    modifyArticle(req.body, res)
  }
}


// 删除文章
let removeArticle = function (req, res) {
  let id = req.body
  moduleArticle.findByIdAndRemove(id).then((response)=>{
    console.log('删除文章成功', response)
    res.jsonp({
      data: [response]
    })
    return response.articleList.Lid
  }, (err)=>{
    res.status(400).send({
      message: err
    })
  }).then(numSubInArticleList)
}

module.exports = {
	getAllArticle: getAllArticle,
	getArticleById: getArticleById,
	getPublishArticleInOneListById: getPublishArticleInOneListById,
	addOrModifyArticle: addOrModifyArticle,
	removeArticle: removeArticle

}