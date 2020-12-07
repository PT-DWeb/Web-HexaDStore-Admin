const productsModel = require('../models/productsModel');

//Get list of products
exports.list = async () => {
    const result = await Product.find({});
    return result;
}

//Add new product
exports.addNewProduct = async (req, res, next) => {
    const newPostData = {
        name: req.body.productName,
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
       
    //Lưu dữ liệu 
    const newproduct = new productsModel(newPostData);
    await newproduct.save();
}
