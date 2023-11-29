const express = require('express')
const app = express()

app.set('view engine','ejs')





const PORT = process.env.PORT || 8080
app.listen(PORT,()=>console.log('http://localhost:'+PORT))