const express = require('express')
const Router = express.Router()
const LoginChecker = require('../auth/loginAuth')

const rateLimit = require('express-rate-limit')
const addOrderValidator = require('./Validator/addOrderValidator')
const Order = require('../models/orderModel')

const limiter = rateLimit({
    windowMs: 10*1000,
    max: 5,
    message: 'Request too rapidly, please try later'
})

//show all orders
Router.get('/',(req,res)=>{
    //orderId,customerName,saler,products,date,totalPrice
    Order.find().select('orderId customerName saler products date totalPrice -_id')
    .then(Orders=>{
        //views here 
        //
        //return res.status('-code-').render('views-here')
        res.json({code:0,message:'all orders',data:Orders})
    })
})

//add new order
Router.post('/',/*LoginChecker,*/limiter,addOrderValidator,(req,res)=>{
    let result = validationResult(req)
    console.log(result)
    if (result.errors.length===0)
    {
        const {orderId,customerName,saler,products,date,totalPrice} = req.body
        let order = new Order({
            orderId,customerName,saler,products,date,totalPrice
        })
        order.save()
        .then(()=>{

            //views here 
            //
            //return res.status(200).render('views-here')

            return res.json({code:0,message:'Add order successfully',data:order})
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

//show order by id
Router.get('/:id',(req,res)=>{
    const orderId = req.params.id;

    Order.findById(orderId).select('orderId customerName saler products date totalPrice -_id')
  .then((order) => {
    if (order) {
      // order found
      //views here 
      //
      //return res.status('-code-').render('views-here')
      return res.json({ code: 0, message: 'Order found', data: order });
    } else {
      // order not found
      //views here 
      //
      //return res.status('-code-').render('views-here')
      return res.json({ code: 1, message: 'Order not found' });
    }
  })
  .catch((error) => {
    //views here 
    //
    //return res.status('-code-').render('views-here')
    return res.json({ code: 2, message: error.message });
  });
})

//update order by id
Router.put('/:id',LoginChecker,limiter,(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:0,
            message:'put method of Order router'})
})

//delete order by id
Router.delete('/:id',LoginChecker,limiter,async (req,res)=>{
    try {
        const orderId = req.params.id;
    
        // Check if the product with the given ID exists
        const order = await Order.findById(orderId);
    
        if (!order) {
          // Product not found
          return res.status(404).json({ code: 1, message: 'Order not found' });
        }
    
        // Product found, proceed with deletion
        await Order.findByIdAndDelete(orderId);
    
        //views here
        //
        //return res.status('-code-').render('views-here')
        return res.json({ code: 0, message: 'Order deleted successfully' });
      } catch (error) {
        // Handle errors
        //views here
        //
        //return res.status('-code-').render('views-here')
        return res.status(500).json({ code: 2, message: error.message });
      }
})

//forbidden
Router.all('*',(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:404,
        message:'page not supported'})
})

module.exports = Router