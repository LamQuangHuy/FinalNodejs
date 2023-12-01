const mgoose = require('mongoose')
const Schema = mgoose.Schema

const AccSchema = new Schema({
    email:{
        type:String,
        unique:true
    },
    password:String,
    username:String
})

module.exports = mgoose.model('user',AccSchema)