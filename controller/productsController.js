//const clothesModel = require('../models/adminModel.js');
const productsModel = require('../models/productsModel')

exports.displayAddProduct = async(req, res, next)=>{
    // const product = await productsModel.find();
    // console.log(product);
    res.render('products/addNewProduct');
}

exports.addProductToDatabase = async(req, res, next) =>{
    const newPostData = {name: req.body.productName,
    baseprice: req.body.productBasePrice,
    discountprice:req.body.productDiscountPrice,
    cover: req.body.filename,
    idmanufacturer: req.body.manufacturer,
    battery: req.body.productBattery,
    camera: req.body.productCamera,
    processor: req.body.productProcessor,
    screen: req.body.productScreen,
    storage: req.body.productStorage
    }
    console.log(req.body.productName);
    console.log(newPostData);
    
    //Lưu dữ liệu 
    const newproduct = new productsModel(newPostData);
    await newproduct.save();
    res.render("products/addNewProduct");
}

exports.product = async(req, res, next) => {
    //Lấy dữ liệu 
    const product = await productsModel.find();
    res.render('products/listProducts',{product});
};

exports.displayEdit = async(req, res, next) => {
    const id= req.params.id;

    //Lấy dữ liệu 
    const product = await productsModel.findOne({_id: id}).lean();
    res.render('products/editProduct', {product});
};

exports.edit = async(req, res, next) => {
    const id= req.params.id;
    const newPostData = {name: req.body.productName,
        baseprice: req.body.productBasePrice,
        discountprice:req.body.productDiscountPrice,
        cover: req.body.filename,
        idmanufacturer: req.body.manufacturer,
        battery: req.body.productBattery,
        camera: req.body.productCamera,
        processor: req.body.productProcessor,
        screen: req.body.productScreen,
        storage: req.body.productStorage
    }
    //Lấy dữ liệu 
    console.log(newPostData);
    //await productsModel.findOneAndUpdate({_id: id},newPostData);
    const product = await productsModel.find();
    
    res.render('products/listProducts', {product});
};

exports.delete = async(req, res, next) => {
    const id= req.params.id;

    //Lấy dữ liệu 
    await productsModel.findOneAndDelete({_id: id});
    const product = await productsModel.find();
    //console.log(product);
    res.render('products/listProducts', {product});
};
