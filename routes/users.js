const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', usersController.displayListAccounts);

router.get('/accountState',usersController.changeAccountState);

router.get('/:id', usersController.displayDetailInfo);

module.exports = router;
