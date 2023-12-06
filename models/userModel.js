const mgoose = require('mongoose')
const Schema = mgoose.Schema

const AccSchema = new Schema({
    email:{
        type:String,
        unique:true
    },
    username:String,
    password:String,
    role: String
})


module.exports = mgoose.model('user',AccSchema)
