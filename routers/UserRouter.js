const express = require('express')
const Router = express.Router()

const {validationResult} = require('express-validator')

const registerValidator = require('./Validator/registerValidator')
const loginValidator = require('./Validator/loginValidator')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/userModel')


Router.get('/',(req,res)=>{
    res.json({code:0,
            message:'get method of User router'})
})

Router.post('/login', loginValidator,(req,res)=>{
    let result = validationResult(req)
    if (result.errors.length===0)
    {
        let {email, password} = req.body
        let account = undefined

        UserModel.findOne({email:email})
        .then(acc =>{
            if (!acc){
                throw new Error('Email is not existed')
            }
            account=acc
            bcrypt.compare(password,acc.password)
        }).then(passwordMatch=>{
            if (!passwordMatch)
            {
                return res.status(401).json({code:2,message:"Login failed"})

            }
            
            
            //return res.status(200).json({code:0,message:"Login successfully"})
            const {JWT_SECRET} = process.emitWarning
            
            jwt.sign({
                email:account.email,
                fullname:account.fullname
            },JWT_SECRET,{
                expiresIn : 60*60
            },(err,token)=>{
                if (err) throw err
                return res.json({
                    code:0,
                    message:'login successfully',
                    token:token
                })
            })


        }).catch(e=>{
            return res.status(401).json({code:2,message:"Login failed: "+e.message})
        })
    }
    else
    {
        let messages = result.mapped()
        let msg = ''
        for (m in messages)
        {
            msg = messages[m]
            break;
        }
        res.json({code:1,message:msg})
    }
    //res.json({code:0,message:'login account'})
})

Router.post('/register',registerValidator,(req,res)=>{
    
    let result = validationResult(req)
    if (result.errors.length===0)
    {
        let {email, password, username} = req.body
        UserModel.findOne({email:email})
        .then(acc =>{
            if (acc){
                throw new Error('this account is existed (email)')
            }
        })
        .then(()=>bcrypt.hash(password, 10))
        .then(hashed =>{
            let user = new UserModel({
                email:email,
                password:password,
                username:username
            })
        return user.save();

        }).then(()=>{
            return res.json({code:0,message:"User Saved", data:user})
        }).catch(e=>{
            return res.json({code:2,message:e.message})
        })
        //return res.json({code:0,message:'register account successfully'})
    }
    else
    {
        let messages = result.mapped()
        let msg = ''
        for (m in messages)
        {
            msg = messages[m]
            break;
        }
        res.json({code:1,message:msg})
    }
    
    
})

module.exports = Router