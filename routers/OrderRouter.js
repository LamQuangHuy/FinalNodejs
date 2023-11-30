const express = require('express')
const Router = express.Router()

Router.get('/',(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:0,
            message:'get method of Order router'})
})

Router.post('/',(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:0,
            message:'post method of Order router'})
})

Router.put('/',(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:0,
            message:'put method of Order router'})
})

Router.delete('/',(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:0,
            message:'delete method of Order router'})
})

Router.patch('/',(req,res)=>{
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