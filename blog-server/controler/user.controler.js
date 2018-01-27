const express = require('express')
const Mongoose = require('mongoose')
const router = express.Router();
const promise = require('promise')
Mongoose.Promise = promise