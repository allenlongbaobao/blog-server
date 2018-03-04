require('../db/model/article.model.js')
require('../db/model/articleList.model.js')
const express = require('express')
const Mongoose = require('mongoose')
const router = express.Router();
const promise = require('promise')
const modelArticleList = Mongoose.model('articleList')
const modelArticle = Mongoose.model('article')
Mongoose.Promise = promise


let addArticle = function (body, res) {
  body._id = Mongoose.Types.ObjectId()
  let date = new Date()
  body.publishAt = date
  //body.publishAt = date.toLocaleString('zn-CN', {hour12: false, timeZone: 'UTC', timeZoneName: 'short'})
  //body.publishAt = (new Date()).toLocaleString('zh-CN', { hour12: false })
  //.replace(/\//g, '-').replace(/\b\d\b/g, '0$&');
  const article = new modelArticle(body);
  article.save().then((response)=>{
    console.log('新增文章成功', response)
    res.jsonp({
      data: [article]
    })
    return body.articleList.Lid
  }).then(numPlusInArticleList)
}

let modifyArticle = function (body, res) {
  modelArticle.findByIdAndUpdate(body._id, body, {new: true}).then((response) => {
    console.log("修改文章成功", response)
    res.jsonp({
      data: [response]
    })
  })
}

let numPlusInArticleList = function (id) {
  modelArticleList.update({_id: id}, {$inc:{articleNum: 1}}, response=>{
    console.log('增加数量成功' + response)

  })
}

let numSubInArticleList = function (id) {
  console.log('删除文章后－－1' + id)
  modelArticleList.update({_id: id}, {$inc:{articleNum: -1}}, response=>{
    console.log('response:' + response)
  })
}

//获取发布的文章数量
let getPublishArticleNum = function (req, res) {
  modelArticle.count({publish: true}).then(data => {
    console.log('查询数量:', data)
    res.jsonp({
      data: data
    })
  })
}

// 获取所有文章
let getAllArticle = function (req, res) {
	modelArticle.find().sort({publishAt: -1}).then(data => {
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
	modelArticle.findById(req.body.id).then(data=>{
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
  modelArticle.find({'articleList.Lid':req.body.id, 'publish': true}).then(response => {
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
  modelArticle.findByIdAndRemove(id).then((response)=>{
    console.log('删除文章成功', response)
    res.jsonp({
      data: response
    })
    return response.articleList.Lid
  }, (err)=>{
    res.status(400).send({
      message: err
    })
  }).then(numSubInArticleList)
}

module.exports = {
  getPublishArticleNum: getPublishArticleNum,
	getAllArticle: getAllArticle,
	getArticleById: getArticleById,
	getPublishArticleInOneListById: getPublishArticleInOneListById,
	addOrModifyArticle: addOrModifyArticle,
	removeArticle: removeArticle

}
