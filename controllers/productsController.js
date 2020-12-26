//const clothesModel = require('../models/adminModel.js');
const {productsModel} = require('../models/productsModel');
const manufacturerModel = require('../models/manufacturerModel');
const productService = require('../models/productsService');
const {product2Model} = require('../models/productsModel');

exports.displayAddProduct = async(req, res, next)=>{
    // const product = await productsModel.find();
    // console.log(product);
    const manufacturer = await productService.getListManufacturer();
    res.render('products/addNewProduct', {manufacturer, js_file: "../js/custom.js"});
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
    console.log(product2Model);
    if( nameProduct != undefined){
        condition.name = nameProduct;
    }
    if(nameManufacturer !=undefined){
        const manufacturer= await manufacturerModel.findOne({manufacturer: nameManufacturer});
        condition.idmanufacturer=manufacturer._id;
    }ll

    const amountProduct = await product2Model.countDocuments({name:{$lte:nameProduct}}, (err, data)=>{
        if(err) throw err;
    });

    if(amountProduct) console.log("count: "+ amountProduct);

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
    const product = await product2Model.find(condition).skip(offset).limit(limit);
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
    const product = await product2Model.findOne({_id: id}).lean();
    const listManufacturer = await productService.getListManufacturerHaveSelected(product.idmanufacturer);
    res.render('products/editProduct', {product, isDisplay: product.detailImgs && product.detailImgs.length > 0, listManufacturer});
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
    await product2Model.findOneAndDelete({_id: id});

    res.redirect("/list-products");
};
