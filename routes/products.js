var express = require('express');
var router = express.Router();

router.get('/add-new-product', function(req, res, next) {
    res.render('products/addNewProduct');
});

/* GET List products table. */
router.get('/', function(req, res, next) {
  res.render('products/listProducts');
});

module.exports = router;