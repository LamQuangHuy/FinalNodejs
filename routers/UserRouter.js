const express = require('express')
const Router = express.Router()
require('dotenv').config();
const {validationResult} = require('express-validator')
const roleAuth = require('../auth/roleAuth')
const registerValidator = require('./Validator/registerValidator')
const loginValidator = require('./Validator/loginValidator')
const nodemailer = require('nodemailer')
// const adminValidator = require('./Validator/adminValidator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const adminModel = require('../models/adminModels')
const UserModel = require('../models/userModel')
const { Schema } = require('mongoose');
const loginAuth = require('../auth/loginAuth');



Router.get('/',(req,res)=>{

    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:0,
            message:'get method of User router'})
})

// Router.post('/admin',adminValidator, (req,res) => {
//     let result = validationResult(req)
//     if(result.errors.length === 0){
//         let{username, password} = req.body
//         let account = undefined
//         adminModel.findOne({username:username})
//         .then(acc => {
//             if(!acc){
//                 res.json({code:1, message:'Invalid username or password'})
//             }
//             account = acc
//             return bcrypt.compare(password, 'admin')
//         })
//     }
//     else{
//         let messages = result.mapped();
//         let msg = '';
//         for (m in messages) {
//             msg = messages[m].msg;
//             break;
//         }
//         //views here 
//         //
//         //return res.status('-code-').render('views-here')
//         res.json({ code: 1, message: msg });
//     }
// })


Router.post('/login',loginValidator, (req, res) => {
    let result = validationResult(req)
    if (result.errors.length===0)
    {
        let {username, password} = req.body
        let account = undefined
        UserModel.findOne({username:username})
        .then(acc =>{
            if (!acc){
                throw new Error('Username is not existed')
            }
            account = acc
            return bcrypt.compare(password,acc.password)
        }).then(passwordMatch=>{
            if (!passwordMatch)
            {
                return res.status(401).json({code:3,message:"Login failed, username or password is not correct"});
            }

            const {JWT_SECRET} = process.env
            // console.log(JWT_SECRET)
            
            jwt.sign({
                username: account.username,
                role: account.role
            }, JWT_SECRET,{
                expiresIn: '1h'
            }, (err,token) => {
                if (err) throw err
                return res.json({
                    code: 0,
                    message: "Login Successfully",
                    token: token

                })
            })

        }).catch(e=>{
            return res.status(401).json({code:2,message:"Login failed: "+e.message})
        })
    } else {
        let messages = result.mapped();
        let msg = '';
        for (m in messages) {
            msg = messages[m];
            break;
        }
        //views here 
        //
        //return res.status('-code-').render('views-here')
        res.json({ code: 1, message: msg });
    }
});

Router.post('/register', loginAuth, roleAuth, registerValidator, (req, res) => {
    let result = validationResult(req)
    if (result.errors.length===0)
    {
        let {email,password, username, role} = req.body
        UserModel.findOne({username:username})
        .then(acc =>{
            if (acc){
                throw new Error('this account is existed')
            }
        })
        .then(()=>bcrypt.hash(password, 10))
        .then(hashed =>{
            let user = new UserModel({
                email: email,
                username:username,
                password:hashed,
                role: role
            })
        return user.save();

        }).then(()=>{
            return res.json({code:0,message:"User Saved"})
        }).catch(e=>{
            return res.json({code:2,message:e.message})
        })
        //return res.json({code:0,message:'register account successfully'})
    } else {
        let messages = result.mapped();
        let msg = '';
        for (m in messages) {
            msg = messages[m].msg;
            break;
        }
        //views here 
        //
        //return res.status('-code-').render('views-here')
        res.json({ code: 1, message: msg });
    }
});

Router.all('*',(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:404,
        message:'page not supported'})
})

module.exports = Router



