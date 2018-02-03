require('../db/model/system.model.js')
const express = require('express')
const Mongoose = require('mongoose')
const router = express.Router();
const promise = require('promise')

const modelSystem = Mongoose.model('system')

Mongoose.Promise = promise

/*
let a = new modelSystem({name: 'allen', visitedNum: 0})
a.save().then(res => {
  console.log (res)
}, err=>{
  console.log (err)
})
*/

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
    console.log('访问量', response.visitedNum)
    res.jsonp({
      data: response.visitedNum
    }, err=> {
      console.log(err)
      res.status(400).send()
    })
  })
}

module.exports = {
  addVisitedNum: addVisitedNum,
  getVisitedNum: getVisitedNum
}