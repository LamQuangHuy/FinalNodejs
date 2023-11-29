const express = require('express')
const Router = express.Router()

const addProductValidator = require('./Validator/addProductValidator')
const product = require('../models/productModel')
const {validationResult} = require('express-validator')

Router.get('/',(req,res)=>{
    Product.find().select('name price desc -_id')
    .then(products=>{
        res.json({code:0,message:'get method of Product router',data:products})

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
            return res.json({code:0,message:'Add product successfully',data:product})
        })
        .catch(e=>{
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
        res.json({code:1,message:msg})
    }
})

module.exports = Router