const formidable = require('formidable');
const path = require('path');
const mv = require('mv');
const cloudinary = require('cloudinary').v2; 

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


const productsModel = require('../models/productsModel');

//Get list of products
exports.list = async () => {
    const result = await productsModel.find({});
    return result;
}

exports.find = async (filter) => {
    const result = await productsModel.find(filter);
    return result;
}

exports.findOne = async (filter) => {
    const result = await productsModel.findOne(filter);
    console.log(result);
    return result;
}

exports.uploadImg = async (coverImg, file_path, cloudinaryFolder,res, next) => {
    const fileName = coverImg.path.split('\\').pop() + '.' + coverImg.name.split('.').pop();
    
    //const filePath = path.join(__dirname, '/../public/img/products/upload/' + fileName);
    const filePath = path.join(__dirname, '/../public/img/' + file_path + fileName);
    console.log("filePath" + filePath);
    mv(coverImg.path, filePath, function(err) {
        if (err) throw err;
    });

    //Upload cover image to server
    // const publicID = 'products/' + coverImg.path.split('\\').pop();
    const publicID = cloudinaryFolder + '/' + coverImg.path.split('\\').pop();
    await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(coverImg.path, { public_id: publicID}, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            //console.log(result);
            resolve();
        });
    });

    return cloudinary.url(publicID);
}

//Add new product
exports.addNewProduct = async (req, res, next) => {
    const form = formidable({ multiples: true });
    
    await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }
   
            const coverImg = files.filename;
            console.log(coverImg.path);

            if (coverImg && coverImg.size > 0){
                this.uploadImg(coverImg, 'products/upload/', 'products').then((link) => {
                    const newPostData = {
                        name: fields.productName,
                        baseprice: fields.productBasePrice,
                        discountprice:fields.productDiscountPrice,
                        cover: link,
                        idmanufacturer: fields.manufacturer,
                        battery: fields.productBattery,
                        camera: fields.productCamera,
                        processor: fields.productProcessor,
                        screen: fields.productScreen,
                        storage: fields.productStorage
                    };
                    const newProduct = new productsModel(newPostData);
                    return newProduct;

                }).then((newProduct)=> {
                    newProduct.save();

                }).catch((err) =>{
                    console.log("Error addNewProduct: " + err);
                    return err;
                });           
            }
          
            resolve();
        });
    });
}

//Edit product
exports.editProduct = async (req, res, next) => {
    const form = formidable({ multiples: true });
    
    await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }
   
            const coverImg = files.filename;
            //console.log(coverImg.path);

            if (coverImg && coverImg.size > 0){
                this.uploadImg(coverImg, 'products/upload/', 'products').then((link) => {
                    const editData = {
                        name: fields.productName,
                        baseprice: fields.productBasePrice,
                        discountprice:fields.productDiscountPrice,
                        cover: link,
                        idmanufacturer: fields.manufacturer,
                        battery: fields.productBattery,
                        camera: fields.productCamera,
                        processor: fields.productProcessor,
                        screen: fields.productScreen,
                        storage: fields.productStorage
                    };
                    return editData;

                }).then((editData)=> {
                    const IDQuery = fields.productID;
                    productsModel.findOneAndUpdate({_id: IDQuery}, editData, {new: true}, (err, doc) => {
                        if (err) reject(err);
                    });

                }).catch((err) =>{
                    console.log("Error editProduct: " + err);
                    return err;
                });         
            }
          
            resolve();
        });
    });
}

exports.deleteProduct=async (filter)=>{
    await productsModel.findOneAndDelete(filter);
}

exports.listProduct = async(filter, limit, offset) =>{
    const option={
        offset: offset,
        limit: limit,
    }
    const product = await productsModel.paginate(filter,option,);

    return product;
}