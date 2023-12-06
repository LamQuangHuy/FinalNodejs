const express = require('express')
const Router = express.Router()
const LoginChecker = require('../auth/loginAuth')

const addProductValidator = require('./Validator/addProductValidator')
const Product = require('../models/productModel')
const {validationResult} = require('express-validator')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 10*1000,
    max: 5,
    message: 'Request too rapidly, please try later'
})

//show all products in store
Router.get('/',(req,res)=>{
    Product.find().select('name price retail_price category creation_date quantity -_id')
    .then(products=>{
        res.json({code:0,message:'get method of Product router',data:products})

        //views here 
        //
        //return res.status(200).render('views-here')
    })

})

//add product
Router.post('/',/*LoginChecker,*/limiter,addProductValidator,(req,res)=>{
    
    let result = validationResult(req)
    console.log(result)
    if (result.errors.length===0)
    {
        const {name, import_price, retail_price, category, creation_date,quantity} = req.body
        //console.log(name, import_price, retail_price, category, creation_date,quantity)


        // update quantity if product existed
        Product.findOne({name, import_price, retail_price, category, creation_date})
        .then((existingProduct) => {
            if (existingProduct) {
              // Product existed => update quantity
              existingProduct.quantity += quantity;
        
              return existingProduct.save()
                .then((updatedProduct) => {
                  return res.json({ code: 0, message: 'Product updated successfully', data: updatedProduct });
                });
            }
            else 
            {
                // add brand new product
                let product = new Product({
                    name, import_price, retail_price, category, creation_date,quantity
                })
                product.save()
                .then(()=>{

                    //views here 
                    //
                    //return res.status(200).render('views-here')

                    return res.json({code:0,message:'Add product successfully',data:product})
                })
            }
        }).catch(e=>{

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

//show product details by id
Router.get('/:id',/*LoginChecker,*/limiter,(req,res)=>{
    const productId = req.params.id;

    Product.findById(productId).select('name price retail_price category creation_date quantity -_id')
  .then((product) => {
    if (product) {
      // Product found
      //views here 
      //
      //return res.status('-code-').render('views-here')
      return res.json({ code: 0, message: 'Product found', data: product });
    } else {
      // Product not found
      //views here 
      //
      //return res.status('-code-').render('views-here')
      return res.json({ code: 1, message: 'Product not found' });
    }
  })
  .catch((error) => {
    //views here 
    //
    //return res.status('-code-').render('views-here')
    return res.json({ code: 2, message: error.message });
  });
})

//update all product's attributes by id
Router.put('/:id',/*LoginChecker,*/limiter,async(req,res)=>{
    
    try {
        const { name, import_price, retail_price, category, creation_date, quantity } = req.body;
    
        
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          { name, import_price, retail_price, category, creation_date, quantity },
          { new: true }
        );
    
        if (updatedProduct) {
            //views here 
            //
            //return res.status('-code-').render('views-here')
            return res.json({ code: 0, message: 'Product updated successfully', data: updatedProduct });
        } else {
            //views here 
            //
            //return res.status('-code-').render('views-here')
            return res.json({ code: 1, message: 'Product not found' });
        }
      } catch (error) {
            //views here 
            //
            //return res.status('-code-').render('views-here')
            return res.json({ code: 2, message: error.message });
      }
})

//delete product by id
Router.delete('/:id',/*LoginChecker,*/limiter,async(req,res)=>{
    try {
      const productId = req.params.id;
    
      // Check if the product with the given ID exists
      const product = await Product.findById(productId);

      if (!product) {
        // Product not found
        return res.status(404).json({ code: 1, message: 'Product not found' });
      }
        
      const inAnyOrder = await Order.find({ 'products.productId': productId });

      if (inAnyOrder.length > 0) {
        return res.status(400).json({ code: 2, message: 'Product is existed in some orders, cannot be deleted' });
      }

      // Product found, proceed with deletion
      await Product.findByIdAndDelete(productId);
    
      //views here
      //
      //return res.status('-code-').render('views-here')
      return res.json({ code: 0, message: 'Product deleted successfully' });
    } catch (error) {
      // Handle errors
      //views here
      //
      //return res.status('-code-').render('views-here')
      return res.status(500).json({ code: 2, message: error.message });
    } 
})

//update quantity product's attributes by id
Router.patch('/:id',/*LoginChecker,*/limiter,async(req,res)=>{
    
    try {
        const { quantity } = req.body;
    
        
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          { quantity },
          { new: true } 
        );
    
        if (updatedProduct) {
            //views here 
            //
            //return res.status('-code-').render('views-here')
            return res.json({ code: 0, message: 'Product quantity updated successfully', data: updatedProduct });
        } else {
            //views here 
            //
            //return res.status('-code-').render('views-here')
            return res.json({ code: 1, message: 'Product not found' });
        }
      } catch (error) {
            //views here 
            //
            //return res.status('-code-').render('views-here')
            return res.json({ code: 2, message: error.message });
      }
});

//forbidden 
Router.all('*',(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:404,
        message:'page not supported'})
})

module.exports = Router