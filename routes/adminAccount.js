var express = require('express');
var router = express.Router();
const adminAccountController = require('../controllers/adminAccountController');

//Get
router.get('/:id', adminAccountController.displayAccInfo);

router.put('/:id', adminAccountController.changeAvatar);

module.exports = router;