const Product = require('../models/productsModel');
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose');


//Get list of products
exports.list = async () => {
    const result = await Product.find({});
    return result;
}

//Add new product
exports.add = async (req, res, next) => {
    console.log("post");
    console.log(req.body);
    const newProduct = new Product(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.productName,
            manufacturer: req.body.manufacturer,
            baseprice: req.body.productBasePrice,
            discountprice: req.body.productDiscountPrice,
            cover: req.body.filename,
            idmanufacturer: req.body.manufacturer,
            battery: req.body.productBattery,
            camera: req.body.productCamera,
            processor: req.body.productProcessor,
            screen: req.body.productScreen,
            storage: req.body.productStorage
        }
    );
    console.log(newProduct);
    if(req.body != null){
        await newProduct.save();
    }
}
