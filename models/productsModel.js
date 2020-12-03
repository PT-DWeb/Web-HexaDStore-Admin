const mongoose = require('mongoose');
const {db} = require('../dal/db');
// const Product = require('../models/product.js');

let productSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    name: {
        type: String
    },
    baseprice: {
        type: String
    },
    discountprice: {
        type: String
    },
    cover: {
        type: String
    }
});

const Product = mongoose.model('Product', productSchema, 'Products');

exports.list = async () => {
    const result = await Product.find({});
    return result;
}