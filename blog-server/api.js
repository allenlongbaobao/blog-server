"use strict";
//  const models = require('./db');
const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')

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
    console.log('get it');
    res.json({
      errorCode: 0,
      data: menuList
    })
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
