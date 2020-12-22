//const clothesModel = require('../models/adminModel.js');
const productsModel = require('../models/productsModel');
const manufacturerModel = require('../models/manufacturerModel');
const manufacturerService= require('../models/manufacturerservice');
const productService = require('../models/productsService');

exports.displayAddProduct = async(req, res, next)=>{
    // const product = await productsModel.find();
    // console.log(product);
    res.render('products/addNewProduct', {js_file: "../js/custom.js"});
}

exports.addProductToDatabase = async (req, res, next) =>{
    await productService.addNewProduct(req, res, next);

    res.redirect("/list-products");
}

exports.product = async(req, res, next) => {
    const page= +req.query.page || 1;
    if(page<0) page=1;

    const limit = 6;
    const offset =(page -1)*6;
    const nameManufacturer=req.params.nameManufacturer;
    const nameProduct=req.query.nameProduct;

    
    const filter={};
    if( nameProduct != undefined){
        filter.name = nameProduct;
    }
    if(nameManufacturer !=undefined){
        const manufacturer= await manufacturerService.findOne({manufacturer: nameManufacturer});
        filter.idmanufacturer=manufacturer._id;
    }

    //Lấy dữ liệu
    const paginate = await productService.listProduct(filter,limit,offset);

    const pageItem=[]
    for(let i=1;i<=paginate.totalPages;i++){
        const items={
            value:i,
            isActive:i===page
        }
        pageItem.push(items);
    }

    res.render('products/listProducts',
    {   
        product: paginate.docs, 
        pageItem: pageItem, 
        prevPage: paginate.prevPage, 
        nextPage: paginate.nextPage,
        canGoPrev: paginate.hasPrevPage,
        canGoNext: paginate.hasNextPage,
    });
};


exports.displayEdit = async(req, res, next) => {
    const id= req.params.id;
    console.log(id);
    //Lấy dữ liệu 
    //const product = await productsModel.findOne({_id: id}).lean();
    const product = await productService.findOne({_id:id});
    res.render('products/editProduct', {product});
};

exports.edit = async (req, res, next) => {
    // const id= req.params.id;
    // const newPostData = {
    //     name: req.body.productName,
    //     baseprice: req.body.productBasePrice,
    //     discountprice:req.body.productDiscountPrice,
    //     //cover: req.body.filename,
    //     idmanufacturer: req.body.manufacturer,
    //     battery: req.body.productBattery,
    //     camera: req.body.productCamera,
    //     processor: req.body.productProcessor,
    //     screen: req.body.productScreen,
    //     storage: req.body.productStorage
    // }
    // //Lấy dữ liệu 
    // await productsModel.findOneAndUpdate({_id: id},newPostData);

    await productService.editProduct(req, res, next);
    res.redirect("/list-products");
};

exports.delete = async(req, res, next) => {
    const id= req.params.id;

    //Lấy dữ liệu 
    const filter={_id:id};
    await productService.deleteProduct(filter);

    res.redirect("/list-products");
};
