const express = require('express')
const Router = express.Router()
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const salt = 10

const modelUser = require('../models/userModel')

//input original data
modelUser.findOne({username: 'maithanhbinh13102003'})
.then((data) => {
  if(!data) {
    bcrypt.hash('123456', salt, async function(err, hash) {
      await modelUser.create({
        username: 'maithanhbinh13102003', 
        password: hash, 
        mail: 'maithanhbinh13102003@gmail.com', 
        roles: 'admin',
        fullname: 'Mai Thanh Binh'
      })
    });
  }
}).catch((err) => console.log(err))

class Login {
    // [get]/login
    getlogin(req, res) {
        const error = req.flash('error')
        const username = req.flash('username')
        res.render('signin', {error, username})
    }

    //[post]/login
    postLogin(req, res) {
        let result = validationResult(req)
        if(result.errors.length === 0) {
            let username = req.body.username
            let password = req.body.password
            req.flash('username', username)
            //check 
            modelUser.findOne({username: username})
            .then((data) => {
            if(!data) {
                req.flash('error', 'Wrong username or wrong password!')
                res.redirect('/users/login')
            }
            else {
                bcrypt.compare(password, data.password).then(function(result) {
                if(result) {
                    delete data.password
                    req.session.user = data
                    // const token = generateAccessToken({userEmail: email})
                    // console.log(token)
                    // res.send({token})
                    return res.redirect('/')
                }
                else {
                    req.flash('error', 'Wrong username or wrong password!')
                    res.redirect('/users/login')
                }
                });
            }
            }).catch((err) => console.log(err)) 
        }
        else {
            result = result.mapped()

            let message;
            for (fields in result) {
                message = result[fields].msg 
                break;
            }

            const {email, password} = req.body 
            
            req.flash('error', message)
            // req.flash('name', name)
            req.flash('username', username)
            
            res.redirect('/users/login')
        }
    }
}

module.exports = new Login
