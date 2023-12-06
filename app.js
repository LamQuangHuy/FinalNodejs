require('dotenv').config()
const express = require('express')
const pRouter = require('./routers/ProductRouter')
const oRouter = require('./routers/OrderRouter')
const uRouter = require('./routers/UserRouter') 
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.json({code:0,message:'success'})
    
    //views here 
    //
    //return res.status(200).render('views-here')
})

app.use('/products',pRouter)
app.use('/orders',oRouter)
app.use('/users',uRouter)
app.all('*',(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:404,
        message:'page not supported'})
})


mongoose.connect('mongodb://127.0.0.1:27017',{
    //useNewUrlParser:true,
    //useUnifiedTopology: true
}).then(()=>{
    const PORT = process.env.PORT || 8088
    app.listen(PORT,()=>console.log('http://localhost:'+PORT))
}).catch(e=>console.log('error: '+e.message))