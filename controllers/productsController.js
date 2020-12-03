const productsModel = require('../models/productsModel.js');

exports.index = async (req, res, next) => {
    //Get product from models
    const productsCollection = await productsModel.list();
    if (productsCollection == null) console.log("null");
    else
        console.dir(productsCollection);

    //Pass data of product to view to display list of products
    res.render('../views/products/listProducts', {productsCollection});
};
