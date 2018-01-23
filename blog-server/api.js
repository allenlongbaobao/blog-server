"use strict";
//  const models = require('./db');
const express = require('express')
const Mongoose = require('mongoose')
const router = express.Router();
const path = require('path')
const fs = require('fs')
const promise = require('promise')
require('./db/module/article.module.js')
require('./db/module/articleList.module.js')
const moduleArticle =  Mongoose.model('article')
const moduleArticleList = Mongoose.model('articleList')
/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/


let menuList = [
  {
    name: '数据结构',
    link: '#',
    articles: [
      {
        name: '数据结构第一篇文章',
        link: 'link1'
      },
      {
        name: '数据结构第二篇文章',
        link: 'link2'
      }
    ]
  },
  {
    name: '算法',
    link: '#',
    articles: [
      {
        name: '算法第一篇文章',
        link: '#'
      }
    ]
  }
]
// 创建账号接口
router.get('/api/getmenu',(req,res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    /*
    db.getDb().then( Db => {
      console.log(Db)
    })
    */
    /*
    db.getDb(function(Db){
      console.log(Db);
      //db.shutDownDb(function(){});
    })
    */
    res.json({
      errorCode: 0,
      data: menuList
    })
});


// 获取文章集列表
router.get('/api/getArticleList', (req, res) => {
  moduleArticleList.find().then(data=>{
    console.log('articleList:' + data)
    res.jsonp({
      data: data
    })
  }).catch(err=>{
    console.log(err)
    res.status(400).send({
      message: 'get article list fail'
    })
  })
});

// 根据id获取文章
router.get('/api/getArticle', (req, res) => {
  moduleArticle.findById(req.body['id']).then(data=>{
    console.log(data)
    res.jsonp({
      data: [data]
    })
  }).catch(err=>{
    console.log(err)
    res.status(400).send({
      message: 'get article fail'
    })
  })
});

// 新增文章集
router.post('/api/addArticleList', (req, res) => {
  const articleList = new moduleArticleList(req.body)
  articleList.save(()=>{
    console.log('增加成功：' + articleList)
    res.jsonp({
      data: articleList
    })
  }, (err)=>{
    console.log(err)
    res.status(400).send({
      message: "add articlelist fail"
    })
  })
});

// 新增文章
router.post('/api/addArticle', (req, res) => {
  const article = new moduleArticle(req.body);
  article.save(()=>{
    console.log(article)
    res.jsonp({
      data: [article]
    })
  }, (err)=>{
    console.log(err)
    res.status(400).send({
      message: "add article fail"
    })
  })
});

// 删除文章
router.delete('/api/deleteArticle', (req, res) => {
  let id = req.body['id']
  moduleArticl.findByIdAndRemove(id).then((response)=>{
    console.log(response)
    res.jsonp({
      data: [response]
    })
  }, (err)=>{
    res.status(400).send({
      message: err
    })
  })
});

// 修改文章
router.post('/api/modifyArticle', (req, res) => {
  let id = req.body['id']
  let update = req.body['update']
  moduleArticle.findByIdAndUpdate(id, update).then((response)=>{
    console.log(response)
    res.jsonp({
      data: [response]
    })
  },(err)=>{
    console.log(err)
    res.status(400).send({
      message: err
    })
  });
});

// 获取已有账号接口
router.get('/api/articles/:id',(req,res) => {
    // 通过模型去查找数据库
  console.log(req.params.id)
  var mdPath = path.join(__dirname, '/articles/' + req.params.id + '.md');
  fs.readFile(mdPath, {
    encoding: 'utf-8'
  }, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    var mdStr = data
    // console.log('mdStr = ' + mdStr);
    res.json({
      errorCode: 0,
      data: mdStr
    });
  });
});

module.exports = router;
