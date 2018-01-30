require('../db/model/user.model.js')
const express = require('express')
const Mongoose = require('mongoose')
const router = express.Router();
const promise = require('promise')

const modelUser = Mongoose.model('user')

Mongoose.Promise = promise

let detectInfo = function (req) {
  return modelUser.find({username: req.body.username}).then(data => {
    if (data.length === 0) {
      return (req.body)
    } else {
      throw new Error('username existed')
    } 
  })
}
let signUp = function (req, res) {
  detectInfo(req).then(response => {
    const user = new modelUser(response)
    user.save(()=>{
      req.session.user = user
      req.session.save()
      res.jsonp({
        data: user
      })
    }, err => {
      res.status(400).send({
        error: error
      })
    })
  }, error => {
    res.status(400).send({
      error: error.message 
    })
  })
}

let signIn = function (req, res) {
  if(req.session.user) {
    res.status(200).send({
      data: req.session.user
    });
  }else{
    modelUser.find({username: req.body.username, password: req.body.password}).then(data => {
      if(data.length == 0){
        res.status(400).send({
          message: '用户不存在'
        })
      }else{
        req.session.user = data[0]
        req.session.save()
        res.jsonp({
          username: data[0].username
        })
      }
    }, err => {
      res.status(400).send({
        message: err.message
      })
    })
  }
}

let signOut =function (req, res) {
  req.session.user = null
  req.session.save()
  res.status(200).send()
}

module.exports = {
  signUp: signUp,
  signIn: signIn,
  signOut: signOut
}