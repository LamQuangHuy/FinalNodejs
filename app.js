require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const Product = require('./models/productModel')

const app = express()

const route = require('./routers')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(cookieParser('12345'))
app.use(session({cookie: { maxAge: 60000 }}))
app.use(flash())
app.use(express.static('public'))

app.get('/',(req,res)=>{
   
    res.render('index')
})
app.get('/products',async (req,res)=>{
    const products = await Product.find();
    console.log(products)
    
   
    res.render('products',{products:products});
})

// [route]

// app.use('/products',pRouter)
// app.use('/orders',oRouter)
// app.use('/users',uRouter)
route(app)


app.all('*',(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:404,
        message:'page not supported'})
})


mongoose.connect('mongodb://localhost:27017',{
    //useNewUrlParser:true,
    //useUnifiedTopology: true
}).then(()=>{
    const PORT = process.env.PORT || 8088
    app.listen(PORT,()=>console.log('http://localhost:'+PORT))
}).catch(e=>console.log('error: '+e.message))
