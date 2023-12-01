require('dotenv').config()
const express = require('express')
const pRouter = require('./routers/ProductRouter')
const oRouter = require('./routers/OrderRouter')
const uRouter = require('./routers/UserRouter') 


const app = express()

app.set('view engine','ejs')

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

const PORT = process.env.PORT || 8080
app.listen(PORT,()=>console.log('http://localhost:'+PORT))