const express = require('express')
const Router = express.Router()
const usersModel = require('../../models/userModel')
const bcrypt = require('bcrypt')
const saltRounds = 10
//middleware
const loginMiddleware = require('../../middlewares/login.middleware')
//controller
const loginController = require('../../controllers/login.controller')

// [ROUTING]
Router.get('/login', loginController.getlogin)
Router.post('/login',loginMiddleware , loginController.postLogin)
module.exports = Router