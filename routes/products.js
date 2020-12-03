var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController')

router.get('/add-new-product', function(req, res, next) {
    res.render('products/addNewProduct');
});

/* GET List products table. */
//router.get('/', productsController.index);
router.get('/', productsController.index);

module.exports = router;