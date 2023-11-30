const express = require('express')
const Router = express.Router()
const LoginChecker = require('../auth/loginAuth')

const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 10*1000,
    max: 5,
    message: 'Request too rapidly, please try later'
})

Router.get('/',(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:0,
            message:'get method of Order router'})
})

Router.post('/',LoginChecker,limiter,(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:0,
            message:'post method of Order router'})
})

Router.put('/',LoginChecker,limiter,(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:0,
            message:'put method of Order router'})
})

Router.delete('/',LoginChecker,limiter,(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:0,
            message:'delete method of Order router'})
})

Router.patch('/',LoginChecker,limiter,(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:0,
            message:'patch method of Order router'})
})

Router.all('*',(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:404,
        message:'page not supported'})
})

module.exports = Router