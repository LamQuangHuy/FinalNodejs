const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    import_price: {
        type: Number,
        required: true
    },
    retail_price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);