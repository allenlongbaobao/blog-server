require('../db/model/system.model.js')
const express = require('express')
const Mongoose = require('mongoose')
const router = express.Router();
const promise = require('promise')

const modelSystem = Mongoose.model('system')

Mongoose.Promise = promise

modelSystem.find().then(response => {
  if(response !== null && response.length === 1){
    console.log('系统实例已经存在')
  } else {
    let a = new modelSystem({name: 'allen', visitedNum: 0})
    a.save().then(res => {
      console.log('新建系统实例', res)
    }).catch(err => {
      throw new Error(err)
    })
  } 
})

let addVisitedNum = function (req, res, next) {
  console.log(req.session)
  if(!req.session.visited) {
    req.session.visited = true 
    req.session.save()
    modelSystem.update({name: 'allen'}, {$inc:{visitedNum: 1}}).then(response => {
      console.log('增加访问量', response)
    }, err => {
      console.log(err)
    })
    next()
  }
}

let getVisitedNum = function (req, res) {
  modelSystem.find({name: 'allen'}).then(response => {
    res.jsonp({
      data: response[0].visitedNum
    })
  }).catch(err => {
    res.status(400).send()
  })
}

module.exports = {
  addVisitedNum: addVisitedNum,
  getVisitedNum: getVisitedNum
}