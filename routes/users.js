var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list-active-accounts', function(req, res, next) {
  res.render('userAccounts/listAccounts');
});

router.get('/list-locked-accounts', function(req, res, next) {
  res.render('userAccounts/listLockedAccounts');
});


module.exports = router;
