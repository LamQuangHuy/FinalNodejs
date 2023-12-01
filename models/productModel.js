const mgoose = require('mongoose')
const Schema = mgoose.Schema

const ProductSchema = new Schema({
    name:{
        type:String
    },
    price:Number,
    desc:String
})

module.exports = mgoose.model('Product',ProductSchema)