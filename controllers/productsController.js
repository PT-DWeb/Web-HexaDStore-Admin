//const clothesModel = require('../models/adminModel.js');
const productsModel = require('../models/productsModel');
const manufacturerModel = require('../models/manufacturerModel');
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
    const limit = 6;

    const page= +req.query.page || 1;
    const nameManufacturer=req.params.nameManufacturer;
    const nameProduct=req.query.nameProduct;

    const condition={};
    if( nameProduct != undefined){
        condition.name = nameProduct;
    }
    if(nameManufacturer !=undefined){
        const manufacturer= await manufacturerModel.findOne({manufacturer: nameManufacturer});
        condition.idmanufacturer=manufacturer._id;
    }

    const amountProduct = await productsModel.countDocuments(condition);

    if(page<0) page=1;

    const offset =(page -1 )*6;
    const totalPage = Math.ceil(amountProduct/limit);
    const pageItem=[]
    for(let i=1;i<=totalPage;i++){
        const items={
            value:i,
            isActive:i===page
        }
        pageItem.push(items);
    }
    
    const prevPage = page==1? page : page-1;
    const nextPage = page==totalPage? page : page+1;
    const canGoPrev = (page>1);
    const canGoNext = (page<totalPage);

    //Lấy dữ liệu 
    const product = await productsModel.find(condition).skip(offset).limit(limit);
    res.render('products/listProducts',
    {   product, 
        pageItem, 
        prevPage, 
        nextPage,
        canGoPrev,
        canGoNext,
    });
};


exports.displayEdit = async(req, res, next) => {
    const id= req.params.id;

    //Lấy dữ liệu 
    const product = await productsModel.findOne({_id: id}).lean();
    res.render('products/editProduct', {product});
};

exports.edit = async (req, res, next) => {
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
    const product = await productsModel.findOneAndUpdate({_id: id});;
    
    res.render('products/listProducts', {product});
};

exports.delete = async(req, res, next) => {
    const id= req.params.id;

    //Lấy dữ liệu 
    const product = await productsModel.findOneAndDelete({_id: id});;
    //console.log(product);
    res.render('products/listProducts', {product});
};
