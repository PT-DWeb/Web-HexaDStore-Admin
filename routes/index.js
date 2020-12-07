var express = require('express');
var router = express.Router();
const productController = require('../controllers/productsController');
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

module.exports = router;
