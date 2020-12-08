const formidable = require('formidable');
const fs = require('fs');
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
    const result = await Product.find({});
    return result;
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
                const fileName = coverImg.path.split('\\').pop() + '.' + coverImg.name.split('.').pop();
                console.log(fileName);
                //fs.renameSync(coverImg.path, path.join(__dirname,'/../public/img/products/' + fileName));
                
                const filePath = path.join(__dirname, '/../public/img/products/upload/' + fileName);
                mv(coverImg.path, filePath, function(err) {
                    if (err) throw err;
                });

                //Upload cover image to server
                const publicID = 'products/' + coverImg.path.split('\\').pop();
                await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload(coverImg.path, { public_id: publicID}, (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        console.log(result);
                        resolve();
                    });
                });

                console.log("Thêm sp");
                const newPostData = {
                    name: fields.productName,
                    baseprice: fields.productBasePrice,
                    discountprice:fields.productDiscountPrice,
                    cover: cloudinary.url(publicID),
                    idmanufacturer: fields.manufacturer,
                    battery: fields.productBattery,
                    camera: fields.productCamera,
                    processor: fields.productProcessor,
                    screen: fields.productScreen,
                    storage: fields.productStorage
                };

                const newProduct = new productsModel(newPostData);
                console.log(newProduct);

                await new Promise((resolve, reject) => {
                    newProduct.save();
                    resolve();
                });            
            }
          
            resolve();
        });
    });


    // form.parse(req, (err, fields, files) => {
    //     if (err) {
    //         next(err);
    //         return;
    //     }

    //     const coverImg = files.filename;
    //     console.log(coverImg.path);

    //     if (coverImg && coverImg.size > 0){
    //         const fileName = coverImg.path.split('\\').pop() + '.' + coverImg.name.split('.').pop();
    //         console.log(fileName);
    //         //fs.renameSync(coverImg.path, path.join(__dirname,'/../public/img/products/' + fileName));
            
    //         const filePath = path.join(__dirname, '/../public/img/products/upload/' + fileName);
    //         mv(coverImg.path, filePath, function(err) {
    //             if (err) throw err;
    //         });

            
    //         //Upload cover image to server
    //         cloudinary.uploader.upload(coverImg.path, { public_id: 'products/' + coverImg.path.split('\\').pop()}, function(err, result){
    //             if(err) throw err;
    //             //console.log(result);
    //         }).then(() => {
    //             console.log("Thêm sp");
    //             const newPostData = {
    //                 name: fields.nameProduct,
    //                 baseprice: fields.productBasePrice,
    //                 discountprice:fields.productDiscountPrice,
    //                 cover: cloudinary.secure_url(coverImg.path),
    //                 idmanufacturer: fields.manufacturer,
    //                 battery: fields.productBattery,
    //                 camera: fields.productCamera,
    //                 processor: fields.productProcessor,
    //                 screen: fields.productScreen,
    //                 storage: fields.productStorage
    //             };

    //             const newProduct = new productsModel(newPostData);
    //             console.log(newProduct);
    //             newProduct.save();
    //         });
    //     }
    //     //Lưu dữ liệu 

    // });

    //const newProduct = new productsModel(newPostData);
    //await newProduct.save();
}
