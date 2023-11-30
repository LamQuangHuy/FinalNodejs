const express = require('express')
const Router = express.Router()

const addProductValidator = require('./Validator/addProductValidator')
const product = require('../models/productModel')
const {validationResult} = require('express-validator')

Router.get('/',(req,res)=>{
    Product.find().select('name price desc -_id')
    .then(products=>{
        res.json({code:0,message:'get method of Product router',data:products})

        //views here 
        //
        //return res.status(200).render('views-here')
    })

})

Router.post('/',addProductValidator,(req,res)=>{
    let result = validationResult(req)
    if (result.errors.length===0)
    {
        const {name,price,desc} = req.body
        let product = new Product({
            name,price,desc
        })

        product.save()
        .then(()=>{

            //views here 
            //
            //return res.status(200).render('views-here')

            return res.json({code:0,message:'Add product successfully',data:product})
        })
        .catch(e=>{

            //views here 
            //
            //return res.status(200).render('views-here')

            return res.json({code:2,message:e.message})
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

        //views here 
        //
        //return res.status(200).render('views-here')
        res.json({code:1,message:msg})
    }
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